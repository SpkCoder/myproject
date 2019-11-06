# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.modules import db_mysql
from flaskApp.modules import my_csv
import json
import time
import re
import os
from datetime import datetime


#/python/device_run_list req_data { "action":"findData", "limit":10, "page":1, "whereJson":{}, "tocken": "eyJhbGciOiJIUzIbmFtZSmei4" }  //查询数据


class model(object):
    def __init__(self,req):
        self.req = req 
        self.table_name = 'device_run_list'
        self.mysqldb = db_mysql.model()

    # 分配方法
    def actions(self):
        # GET请求
        if self.req.method == 'GET':

            str_action = self.req.dict_req['action']
            if str_action == 'exportData':
                str_action = 'findData'
            # 判断权限
            if not self.mysqldb.get_power(self.req.dict_tocken['role_id'], self.table_name, str_action):
                dict_res = {'code': 500, 'msg': '没有权限'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))

            if self.req.dict_req['action'] == 'findData':
                return self.find_data()
            elif self.req.dict_req['action'] == 'exportData':
                return self.export_data()
            else:
                dict_res = {'code': 500, 'msg': 'action错误'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))

        else:
            dict_res = {'code': 500, 'msg': 'method错误'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))


    # 查询数据
    def find_data(self):
        params = self.req.dict_req
        params['limit'] = int(params['limit']) if 'limit' in params else 10
        params['page'] = int(params['page']) if 'page' in params else 1
        params['offset'] = params['limit'] * (int(params['page']) - 1) if 'page' in params else 0

        # 明细_查询
        if 'type' in params['whereJson'] and params['whereJson']['type'] == 'detail':
            if 'time' not in params['whereJson']:
                dict_res = {'code': 500, 'msg': 'whereJson错误'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
            if 'client_ip' not in params['whereJson']:
                dict_res = {'code': 500, 'msg': 'client_ip错误'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
            str_gte = params['whereJson']['time'] + ' 00:00:00'
            date_gte = datetime.strptime(str_gte, '%Y-%m-%d %H:%M:%S')
            int_gte = int(date_gte.timestamp())
            int_now = int(time.time())
            int_now = int_now - int_now % 300
            if (int_now-int_gte)/3600/24 >= 1:
                date_lt = datetime.fromtimestamp(int_gte+3600*24)
                int_num = int(3600*24/300)
            else:
                date_lt = datetime.fromtimestamp(int_now)
                int_num = int((int_now-int_gte)/300)
            str_lt = date_lt.strftime('%Y-%m-%d %H:%M:00')
            whereStr = 'create_time >= "'+str_gte+'" and create_time < "'+str_lt+'"'+' and client_ip = "'+params['whereJson']['client_ip']+'"'
            sql = 'select client_ip, cpu_rate, net_flow_receive, net_flow_send, net_speed, ram_rate, create_time from device_run_list where '+whereStr+' group by create_time order by create_time asc'
            result = self.mysqldb.find_data(self.table_name, params, sql)
            if result:
                result['time'] = []
                result['cpu_rate'] = []
                result['ram_rate'] = []
                result['net_flow_receive'] = []
                result['net_flow_send'] = []
                result['net_speed'] = []
                result['dict_cpu_rate'] = {}
                result['dict_ram_rate'] = {}
                result['dict_net_flow_receive'] = {}
                result['dict_net_flow_send'] = {}
                result['dict_net_speed'] = {}
                for item in result['rows']:
                    result['dict_cpu_rate'][item['create_time']] = item['cpu_rate']
                    result['dict_ram_rate'][item['create_time']] = item['ram_rate']
                    result['dict_net_flow_receive'][item['create_time']] = item['net_flow_receive']
                    result['dict_net_flow_send'][item['create_time']] = item['net_flow_send']
                    result['dict_net_speed'][item['create_time']] = item['net_speed']
                for i in range(int_num):
                    if i == 0:
                        continue
                    str_time = datetime.fromtimestamp(int_gte + 300*i).strftime('%Y-%m-%d %H:%M:00')
                    if str_time in result['dict_cpu_rate']:
                        result['cpu_rate'].append(result['dict_cpu_rate'][str_time])
                    else:
                        result['cpu_rate'].append(0)
                    if str_time in result['dict_ram_rate']:
                        result['ram_rate'].append(result['dict_ram_rate'][str_time])
                    else:
                        result['ram_rate'].append(0)
                    if str_time in result['dict_net_flow_receive']:
                        result['net_flow_receive'].append(result['dict_net_flow_receive'][str_time])
                    else:
                        result['net_flow_receive'].append(0)
                    if str_time in result['dict_net_flow_send']:
                        result['net_flow_send'].append(result['dict_net_flow_send'][str_time])
                    else:
                        result['net_flow_send'].append(0)
                    if str_time in result['dict_net_speed']:
                        result['net_speed'].append(result['dict_net_speed'][str_time])
                    else:
                        result['net_speed'].append(0)
                    result['time'].append(str_time.split(' ')[1])
                del result['count']
                del result['rows']
                del result['dict_cpu_rate']
                del result['dict_ram_rate']
                del result['dict_net_flow_receive']
                del result['dict_net_flow_send']
                del result['dict_net_speed']
                dict_res = {'code': 200, 'msg': '操作成功', 'info': result}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
            else:
                dict_res = {'code': 500, 'msg': '操作失败'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            whereStr = ''
            sortStr = ''
            if len(params['whereJson']) > 0:
                whereStr = ' where '+self.mysqldb.get_whereStr(params)
            if len(params['sortJson']) > 0:
                sortStr = ' order by ' + self.mysqldb.get_sortStr(params)
            # sql = 'select * from (select * from device_run_list order by log_time desc limit 10000) t'+whereStr+' group by client_ip'+sortStr+' limit '+str(params['offset'])+','+str(params['limit'])
            sql = 'select t2.*, device_list.code, device_list.name from (select * from (select * from device_run_list order by log_time desc limit 10000) t group by client_ip) t2 left join device_list on t2.client_ip = device_list.ip'+whereStr+sortStr+' limit '+str(params['offset'])+','+str(params['limit'])
            # sql_count = 'select count(*) as number from (select count(*) as number from device_run_list'+whereStr+' group by client_ip) gyd'
            sql_count = 'select count(*) as number from (select t2.*, device_list.code, device_list.name from (select * from device_run_list group by client_ip) t2 left join device_list on t2.client_ip = device_list.ip'+whereStr+') gyd'
            result = self.mysqldb.find_data(self.table_name, params, sql, sql_count)
            # print(result)

            if result:
                dict_res = {'code': 200, 'msg': '操作成功', 'limit': params['limit'], 'page': params['page'], 'count': result['count'], 'rows': result['rows']}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
            else:
                dict_res = {'code': 500, 'msg': '操作失败'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))


    def export_data(self):
        params = self.req.dict_req
        params['limit'] = int(params['limit']) if 'limit' in params else 10
        params['page'] = int(params['page']) if 'page' in params else 1
        params['offset'] = params['limit'] * (int(params['page']) - 1) if 'page' in params else 0
        whereStr = ''
        sortStr = ''
        if len(params['whereJson']) > 0:
            whereStr = ' where '+self.mysqldb.get_whereStr(params)
        if len(params['sortJson']) > 0:
            sortStr = ' order by ' + self.mysqldb.get_sortStr(params)
        # sql = 'select * from (select * from device_run_list order by log_time desc limit 10000) t'+whereStr+' group by client_ip'+sortStr+' limit '+str(params['offset'])+','+str(params['limit'])
        sql = 'select t2.*, device_list.code, device_list.name from (select * from (select * from device_run_list order by log_time desc limit 10000) t group by client_ip) t2 left join device_list on t2.client_ip = device_list.ip'+whereStr+sortStr+' limit '+str(params['offset'])+','+str(params['limit'])
        result = self.mysqldb.find_data(self.table_name, params, sql)
        # print(result)
        if result:
            file_path = os.path.dirname(os.path.dirname(__file__)) + '/static/uploadFile/'+ self.table_name +'_export.csv'
            list_title = ["设备编号", "设备名称", '设备IP', 'CPU使用率', '内存使用率', '接收流量(Kb)', '发送流量(Kb)', '网速(Kb/s)', '时间']
            list_title_en = ["code", "name", 'client_ip', 'cpu_rate', 'ram_rate', 'net_flow_receive', 'net_flow_send', 'net_speed', 'log_time']
            mycsv = my_csv.model()
            result = mycsv.write(file_path,list_title,list_title_en,result['rows'])
            str_url = result['url']
            str_url = '/uploadFile' + str_url[str_url.rindex('/'):]
            dict_res = {'code': 200, 'msg': '操作成功', 'url': str_url}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))