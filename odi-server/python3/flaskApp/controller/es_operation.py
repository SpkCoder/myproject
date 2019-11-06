# -*- coding:utf-8 -*-

from flaskApp.modules import db_es
from flaskApp.modules import db_mysql
from datetime import datetime, timedelta, timezone
import logging
import json
import re
import time
from multiprocessing import Process, Pool


class model(object):

    def __init__(self, gt_str, lt_str):
        super(model, self).__init__()
        self._gte_str = gt_str
        self._lt_str = lt_str
        self.esdb = db_es.model()
        self.mysqldb = db_mysql.model()
        self.table_dns_req_list = self.mysqldb.split_table('dns_req_list_latest')
        self.get_log_time()

    # 获取最新的一条log_time
    def get_log_time(self):
        params = {}
        table_name = 'log_time_latest'
        sql = 'select * from log_time_latest order by log_time desc limit 0,1'
        result = self.mysqldb.find_data(table_name, params, sql)
        if len(result['rows']) > 0:
            self._gt_str = result['rows'][0]['log_time']
            self._lte_str = self._lt_str
        else:
            self._gt_str = self._gte_str
            self._lte_str = self._lt_str

    # 获取es数据，正则匹配message，存入不同的数据表
    def run(self):
        logging.info("run es search: " + self._gt_str + ' ~ ' + self._lte_str)
        time_stamp = time.time()
        # queryJson = {"query": { "bool": { "must": [ { "match_all": {} }, { "range": { "log_time": { "gte": "2019-10-18 14:35:00", "lt": "2019-10-18 14:40:00" } } } ], "should": [] } }, "from":0, "size": 1000, "sort": [{ "log_time" : {"order" : "asc"}}] }
        # queryJson['query']['bool']['must'][1]['range']['log_time']['gte'] = self._gte_str
        # queryJson['query']['bool']['must'][1]['range']['log_time']['lt'] = self._lt_str
        queryJson = {"query": { "bool": { "must": [ { "match_all": {} }, { "range": { "log_time": { "gt": "2019-10-18 14:35:00", "lte": "2019-10-18 14:40:00" } } } ], "should": [] } }, "from":0, "size": 1000, "sort": [{ "log_time" : {"order" : "asc"}}] }
        queryJson['query']['bool']['must'][1]['range']['log_time']['gt'] = self._gt_str
        queryJson['query']['bool']['must'][1]['range']['log_time']['lte'] = self._lte_str
        index_name = "dns-info-log-*"
        #获取ES数据总数
        # result = self.esdb.find_data(index_name, queryJson)
        result = self.esdb._es.search(index=index_name, body=queryJson, scroll='5m')
        sid = result['_scroll_id']
        total = result['hits']['total']
        scroll_size = result['hits']['total']
        rows = result['hits']['hits']
        already_run_number = 0
        while scroll_size > 0:
            result = self.esdb._es.scroll(scroll_id=sid, scroll='5m')
            sid = result['_scroll_id']
            scroll_size = len(result['hits']['hits'])
            rows.extend(result['hits']['hits'])
            already_run_number += len(rows)
            if len(rows) > 0:
                #解析ES数据存入数据库
                dns_req_list = []
                device_run_list = []
                operation_list = []
                for item in rows:
                    message = item['_source']['message']
                    # log_time = datetime.strptime(item['_source']['log_time'], '%Y-%m-%d %H:%M:%S')+timedelta(hours=8)
                    # create_time = datetime.strptime(self._gte_str, '%Y-%m-%d %H:%M:%S')+timedelta(hours=8)
                    log_time = item['_source']['log_time']
                    create_time = log_time[0:15] + '5:00' if int(log_time[15:16]) >= 5 else log_time[0:15] + '0:00'

                    try:
                        #DNS问询
                        if message.find('response:') > 0:
                            list_message = re.compile(r'\s+').split(message)
                            # print(message)
                            dict_req_status = {
                                'NOERROR': 0,
                                'NXDOMAIN': 1,
                                'SERVFAIL': 2,
                                'OTHER': 3,
                            }
                            req_status_code = list_message[14]
                            if req_status_code in dict_req_status:
                                req_status = dict_req_status[req_status_code]
                            else:
                                req_status = 3
                            dict_data = {'server_ip':list_message[2],'client_ip':list_message[7].split('#')[0],'client_host':list_message[10][:50],'type_name':list_message[12],'req_status':req_status,'log_time':log_time,'create_time':create_time}
                            # table_name = 'dns_req_list'
                            # result = self.mysqldb.insert_data(table_name,[dict_data])
                            dns_req_list.append(dict_data)

                        #客户端类型统计--暂停开发
                        # elif re.search(r'.*dhcpd\[\d*\]:  DHCPREQUEST for .* from .*', message):
                        #     list_message = re.compile(r'\s+').split(message)
                        #     # print(list_message)
                        #     os_type = list_message[list_message.index('via')-1]
                        #     if re.search(r'\(.*\)', os_type):
                        #         os_type = re.sub(r'\(|-.*', "", os_type)
                        #     else:
                        #         os_type = '未知'
                        #     list_data = [{'client_ip':list_message[6],'os_type':os_type,'log_time':log_time,'create_time':create_time}]
                        #     # print(list_data)
                        #     table_name = 'client_type_list'
                        #     result = self.mysqldb.insert_data(table_name,list_data)

                        #DHCP租期历史记录统计--暂停开发
                        # elif re.search(r'.*dhcpd\[\d*\]:  DHCPACK .* lease-duration .*', message):
                        #     list_message = re.compile(r'\s+').split(message)
                        #     # print(list_message)
                        #     int_lease = int(list_message[list_message.index('lease-duration')+1])
                        #     list_data = [{'server_ip':list_message[2], 'client_ip':list_message[2], 'client_host':'', 'client_mac':list_message[8], 'lease':int_lease,'log_time':log_time,'create_time':create_time}]
                        #     # print(list_data)
                        #     table_name = 'dhcp_record_list'
                        #     result = self.mysqldb.insert_data(table_name,list_data)

                        #地址利用率统计--暂停开发
                        elif message.find('5分钟CPU平均负载:') > 0:
                            list_message = re.compile(r'\s+').split(message)
                            # print(list_message)
                            #地址利用率统计--暂停开发
                            # client_ip = list_message[list_message.index('DHCP分配的子网:')+2].replace('"','')
                            # client_ip2 = list_message[list_message.index('DHCP分配的子网掩码:')+2].replace('"','')
                            # if re.search(r'\d*\.\d*\.\d*\.\d*', client_ip2):
                            #     net_segment = ''.join([bin(int(x))[2:] for x in client_ip2.split('.')]).index('0')
                            # else:
                            #     net_segment = 0
                            # client_ip = client_ip + '/' + str(net_segment)
                            # address_rate = round(float(list_message[list_message.index('DHCP子网租用率:')+2])/100,2)
                            # list_data = [{'client_ip':client_ip, 'vlan_id':0, 'vlan_name':'', 'vrf_name':'', 'address_rate':address_rate, 'log_time':log_time,'create_time':create_time}]
                            # # print(list_data)
                            # table_name = 'address_rate_list'
                            # result = self.mysqldb.insert_data(table_name,list_data)

                            #服务端设备运行状态报表
                            cpu_rate = float(list_message[list_message.index('5分钟CPU平均负载:')+4])
                            ram_used = int(list_message[list_message.index('已使用内存大小')+5])
                            ram_all = int(list_message[list_message.index('内存总体大小')+5])
                            ram_rate = round(ram_used/ram_all, 2)
                            if list_message[list_message.index('从该接口上发送的字节总数')+5].isdigit():
                                net_flow_send = int(int(list_message[list_message.index('从该接口上发送的字节总数')+5])/1024)
                            else:
                                net_flow_send = 0
                            if list_message[list_message.index('在接口上收到的总字节数')+5].isdigit():
                                net_flow_receive = int(int(list_message[list_message.index('在接口上收到的总字节数')+5])/1024)
                            else:
                                net_flow_receive = 0
                            net_speed = int(int(list_message[list_message.index('网口传输速率，单位为位/s;bps:')+8])/8/1024)
                            # client_ip = list_message[list_message.index('网口传输速率，单位为位/s;bps:')+4]
                            client_ip = list_message[list_message.index('设备IP地址为:')+1]
                            dict_data = {'client_ip':client_ip, 'cpu_rate':cpu_rate, 'ram_used':ram_used, 'ram_all':ram_all, 'ram_rate':ram_rate, 'net_flow_send':net_flow_send, 'net_flow_receive':net_flow_receive, 'net_speed':net_speed, 'log_time':log_time,'create_time':create_time}
                            # table_name = 'device_run_list'
                            # result = self.mysqldb.insert_data(table_name,[dict_data])
                            device_run_list.append(dict_data)

                        #服务端操作审计报表
                        elif message.find('httpd:') > 0:
                            list_message = re.compile(r'\s+').split(message, 8)
                            # print(list_message)
                            client_ip = list_message[2]
                            username = re.sub(r'\[|\]', "", list_message[6]).replace(':', '')
                            operation_type = list_message[7]
                            if re.search(r'CALLED', list_message[7], re.I):
                                operation_type = '取消操作'
                            elif re.search(r'CREATED', list_message[7], re.I):
                                operation_type = '创建项目'
                            elif re.search(r'DELETED', list_message[7], re.I):
                                operation_type = '删除项目'
                            elif re.search(r'LOGIN', list_message[7], re.I):
                                operation_type = '登录'
                            elif re.search(r'LOGOUT', list_message[7], re.I):
                                operation_type = '退出'
                            elif re.search(r'MESSAGE', list_message[7], re.I):
                                operation_type = '系统广播消息'
                            elif re.search(r'MODIFIED', list_message[7], re.I):
                                operation_type = '修改项目'
                            else:
                                operation_type = '未知'
                            operation_msg = list_message[7] +' '+ list_message[8].replace('\'', '"')
                            operation_msg = operation_msg[:100]
                            dict_data = {'client_ip':client_ip, 'username':username, 'operation_type':operation_type, 'operation_msg':operation_msg, 'log_time':log_time,'create_time':create_time}
                            # table_name = 'operation_list'
                            # result = self.mysqldb.insert_data(table_name,[dict_data])
                            operation_list.append(dict_data)

                        #其他
                        else :
                            pass
                    except Exception as e:
                        logging.error('es message error: ' + str(e))

                p = Pool(4)
                if len(dns_req_list) > 0:
                    p_res = p.apply_async(self.mysqldb.insert_data, args=(self.table_dns_req_list, dns_req_list))
                if len(device_run_list) > 0:
                    p_res = p.apply_async(self.mysqldb.insert_data, args=('device_run_list', device_run_list))
                if len(operation_list) > 0:
                    p_res = p.apply_async(self.mysqldb.insert_data, args=('operation_list', operation_list))
                p_res = p.apply_async(self.mysqldb.insert_data, args=('log_time_latest', [{'log_time': rows[len(rows)-1]['_source']['log_time']}]))
                p.close()
                # p.join()
            logging.info('already run number: '+ str(already_run_number) +' spend time: ' + str(time.time() - time_stamp))
            rows = []
        logging.info('es search total: '+str(total))
        logging.info('es search spend time: ' + str(time.time() - time_stamp))

