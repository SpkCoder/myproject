# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.modules import db_mysql
from flaskApp.modules import my_csv
from flaskApp.modules import my_requests
import json
import time
import re
import os
from datetime import datetime
from multiprocessing import Process, Pool


#/python/device_list req_data { "action":"findData", "limit":10, "page":1, "whereJson":{}, "tocken": "eyJhbGciOiJIUzIbmFtZSmei4" }  //查询数据
#/python/device_list req_data { "action":"insertData", "dataArr":[{"class_name":"超级用户"}], "tocken": "eb2xlX2lkIj4gphmei4" }  //插入数据
#/python/device_list req_data { "action":"updateData", "whereJson":{"id":"1"}, "updateJson":{"class_name":"超级用户"}, "tocken": "eb2xlX2lkIj4gphmei4" }  //修改数据
#/python/device_list req_data { "action":"delData", whereJson={"id":[1,3]}, "tocken": "eyJhbGciOiJIUzIbmFtZSmei4" }  //删除数据


class model(object):
    def __init__(self,req):
        self.req = req 
        self.table_name = 'device_list'
        self.mysqldb = db_mysql.model()
        self.my_requests = my_requests.model()

    # 分配方法
    def actions(self):
        # GET请求
        if self.req.method == 'GET':

            str_action = self.req.dict_req['action']
            if str_action == 'exportData':
                str_action = 'findData'
            # 判断权限
            # if not self.mysqldb.get_power(self.req.dict_tocken['role_id'], self.table_name, str_action):
            #     dict_res = {'code': 500, 'msg': '没有权限'}
            #     return make_response(json.dumps(dict_res, ensure_ascii=False))

            if self.req.dict_req['action'] == 'findData':
                return self.find_data()
            elif self.req.dict_req['action'] == 'exportData':
                return self.export_data()
            else:
                dict_res = {'code': 500, 'msg': 'action错误'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))

        # POST请求
        elif self.req.method == 'POST':

            str_action = self.req.dict_req['action']
            if str_action == 'importData':
                str_action = 'insertData'
            # 判断权限
            if not self.mysqldb.get_power(self.req.dict_tocken['role_id'], self.table_name, str_action):
                dict_res = {'code': 500, 'msg': '没有权限'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
            if self.req.dict_req['action'] == 'insertData':
                return self.insert_data()
            elif self.req.dict_req['action'] == 'updateData':
                return self.update_data()
            elif self.req.dict_req['action'] == 'delData':
                return self.del_data()
            elif self.req.dict_req['action'] == 'importData':
                return self.import_data()
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
        params['whereJson'] = params['whereJson'] if 'whereJson' in params else {}

        if params['whereJson']['id'][:2] == 'sh':
            params['whereJson']['id'] = '1.' + params['whereJson']['id'][2:]
        elif params['whereJson']['id'][:2] == 'sz':
            params['whereJson']['id'] = '0.' + params['whereJson']['id'][2:]
        else:
            dict_res = {'code': 500, 'msg': '股票代码错误'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

        # str_url = f'http://pdfm.eastmoney.com/EM_UBG_PDTI_Fast/api/js?rtntype=5&token=&cb=&id={params["whereJson"]["id"]}&type={params["whereJson"]["type"]}&authorityType=fa&_=1573788247844'
        str_url = f'http://push2his.eastmoney.com/api/qt/stock/kline/get?cb=&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f61&ut=7eea3edcaed734bea9cbfc24409ed989&klt={params["whereJson"]["type"]}&fqt=1&secid={params["whereJson"]["id"]}&beg=0&end=20500000&_=1590301710113'
        result = self.my_requests.get(url=str_url)

        if result['data']:
            # result['info']['code'] = result['code']
            # result['info']['name'] = result['name']
            dict_res = {'code': 200, 'msg': '操作成功', 'limit': params['limit'], 'page': params['page'], 'data': result['data']}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '股票代码错误'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))


    # 插入数据
    def insert_data(self):
        if 'dataArr' not in self.req.dict_req:
            dict_res = {'code': 500, 'msg': 'miss dataArr'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        if type(self.req.dict_req['dataArr']) != list or len(self.req.dict_req['dataArr']) != 1:
            dict_res = {'code': 500, 'msg': 'dataArr错误'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

        list_data = self.req.dict_req['dataArr']
        list_ip = []
        for item in list_data:
            item['create_name'] = self.req.dict_tocken['username']
            item['create_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            item['update_name'] = ''
            item['update_time'] = ''
            if 'ip' not in item or item['ip'] == '':
                dict_res = {'code': 500, 'msg': 'ip错误'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
            list_ip.append(item['ip'])

        params = { 'whereJson':{ '$or': [{'ip':list_data[0]['ip']}, {'code':list_data[0]['code']}, {'name':list_data[0]['name']}] }, 'fieldJson':{'ip': 1, 'code': 1, 'name': 1 } }
        result = self.mysqldb.find_data(self.table_name, params)
        if result['count'] != 0:
            dict_res = {'code': 500, 'msg': 'code或name或ip已存在'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

        result = self.mysqldb.insert_data(self.table_name, list_data)
        # print(result)

        if result:
            dict_res = {'code': 200, 'msg': '操作成功'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))


    # 修改数据
    def update_data(self):
        if 'whereJson' not in self.req.dict_req:
            dict_res = {'code': 500, 'msg': 'miss whereJson'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        if 'updateJson' not in self.req.dict_req:
            dict_res = {'code': 500, 'msg': 'miss updateJson'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        if 'id' in self.req.dict_req['updateJson']:
            dict_res = {'code': 500, 'msg': '禁止修改id'}

        whereJson = self.req.dict_req['whereJson']
        updateJson = self.req.dict_req['updateJson']
        updateJson['update_name'] = self.req.dict_tocken['username']
        updateJson['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        list_or = []
        if 'ip' in updateJson:
            list_or.append({'ip':updateJson['ip']})
        if 'code' in updateJson:
            list_or.append({'code':updateJson['code']})
        if 'name' in updateJson:
            list_or.append({'name':updateJson['name']})
        params = { 'whereJson':{'id': {'$nin': [whereJson['id']]}, '$or': list_or }, 'fieldJson':{'ip': 1, 'code': 1, 'name': 1 } }
        result = self.mysqldb.find_data(self.table_name, params)
        if result['count'] != 0:
            dict_res = {'code': 500, 'msg': 'code或name或ip已存在'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

        result = self.mysqldb.update_data(self.table_name, whereJson, updateJson)
        # print(result)

        if result:
            dict_res = {'code': 200, 'msg': '操作成功'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))


    # 删除数据
    def del_data(self):
        if 'whereJson' not in self.req.dict_req:
            dict_res = {'code': 500, 'msg': 'miss whereJson'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

        whereJson = self.req.dict_req['whereJson']
        result = self.mysqldb.del_data(self.table_name, whereJson)
        # print(result)

        if result:
            dict_res = {'code': 200, 'msg': '操作成功'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))


    # 导入数据
    def import_data(self):
        # dict_req = self.req.dict_req
        file = self.req.files.get('file')
        if not file:
            dict_res = {'code': 500, 'msg': 'file不能为空'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        file_path = os.path.dirname(os.path.dirname(__file__)) + '/static/uploadFile/'+ self.table_name +'_import.csv'
        file.save(file_path)
        mycsv = my_csv.model()
        list_title_en = ['code','name','ip','level','factory','device_type','os','os_version','cpu','ram','disk','power','address','message','online_time']
        result = mycsv.read(file_path,list_title_en)
        if result['msg']:
            dict_res = {'code': 500, 'msg': result['msg']}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

        list_data = result['rows']
        list_ip = []
        for item in list_data:
            item['create_name'] = self.req.dict_tocken['username']
            item['create_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            item['update_name'] = ''
            item['update_time'] = ''
            if 'ip' not in item or item['ip'] == '':
                dict_res = {'code': 500, 'msg': 'ip错误'}
                return make_response(json.dumps(dict_res, ensure_ascii=False))
            list_ip.append(item['ip'])

        params = { 'whereJson':{ 'ip': {'$in':list_ip} }, 'fieldJson':{ 'id': 1, 'ip': 1 } }
        result = self.mysqldb.find_data(self.table_name, params)
        if result['count'] != 0:
            dict_res = {'code': 500, 'msg': 'ip已存在'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

        result = self.mysqldb.insert_data(self.table_name, list_data)
        # print(result)

        if result:
            dict_res = {'code': 200, 'msg': '操作成功'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))


    # 导出数据
    def export_data(self):
        params = self.req.dict_req
        params['limit'] = int(params['limit']) if 'limit' in params else 10
        params['page'] = int(params['page']) if 'page' in params else 1
        result = self.mysqldb.find_data(self.table_name, params)
        # print(result)
        if result:
            file_path = os.path.dirname(os.path.dirname(__file__)) + '/static/uploadFile/'+ self.table_name +'_export.csv'
            list_title = ['设备编号', '设备名称', 'IP地址', '所属节点', '所属厂商', '设备类型', '操作系统', '版本号', 'CPU', '内存', '磁盘空间', '功率', '地址', '备注', '上线时间']
            list_title_en = ['code','name','ip','level','factory','device_type','os','os_version','cpu','ram','disk','power','address','message','online_time']
            mycsv = my_csv.model()
            result = mycsv.write(file_path,list_title,list_title_en,result['rows'])
            str_url = result['url']
            str_url = '/uploadFile' + str_url[str_url.rindex('/'):]
            dict_res = {'code': 200, 'msg': '操作成功', 'url': str_url}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

