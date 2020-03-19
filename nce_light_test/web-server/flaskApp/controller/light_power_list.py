# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.modules import db_mysql
import json
import time
import re


#/api/python/light_power_list req_data { "action":"findData", "limit":10, "page":1, "whereJson":{"group_type": "M"}, "tocken": "" }  //查询数据


class model(object):
    def __init__(self,req):
        self.req = req 
        self.table_name = 'light_power_list'
        self.mysqldb = db_mysql.model()

    # 分配方法
    def actions(self):
        # GET请求
        if self.req.method == 'GET':

            # 判断权限
            # if not self.mysqldb.get_power(self.req.dict_tocken['role_id'], self.table_name, self.req.dict_req['action']):
            #     dict_res = {'code': 500, 'msg': '没有权限'}
            #     return make_response(json.dumps(dict_res, ensure_ascii=False))

            if self.req.dict_req['action'] == 'findData':
                return self.find_data()
            elif self.req.dict_req['action'] == 'findData2':
                return self.find_data2()
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
        # int_now = int(time.time())
        if params['whereJson']['group_type'] == 'M':
            whereStr = 'where pon_name = "'+params['whereJson']['pon_name']+'"'
            sql = 'select time, password, pon_name, power_receive, power_send from light_power_list '+whereStr+' group by time,password order by time asc'
        else:
            dict_res = {'code': 500, 'msg': 'group_type错误'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        result = self.mysqldb.find_data(self.table_name, params, sql)
        # print(result)
        if result:
            info = {}
            info['time'] = []
            info['all'] = {}
            info['dict_time_password'] = {}
            info['sort'] = []
            for item in result['rows']:
                str_time_password = item['time']+'_'+item['password']
                if str_time_password not in info['dict_time_password']:
                    info['dict_time_password'][str_time_password] = [item['power_receive'], item['power_send']]
                if item['time'] not in info['time']:
                    info['time'].append(item['time'])
                if item['password'] not in info['sort']:
                    info['sort'].append(item['password'])
                    info['all'][item['password']] = {
                        'power_receive': [],
                        'power_send': []
                    }
            for str_time in info['time']:
                for str_password in info['sort']:
                    str_time_password = str_time+'_'+str_password
                    if str_time_password in info['dict_time_password']:
                        power_receive = info['dict_time_password'][str_time_password][0]
                        power_send = info['dict_time_password'][str_time_password][1]
                    else:
                        power_receive = 0
                        power_send = 0
                    info['all'][str_password]['power_receive'].append(power_receive)
                    info['all'][str_password]['power_send'].append(power_send)
            del info['dict_time_password']
            del result
            dict_res = {'code': 200, 'msg': '操作成功', 'info': info}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))

    # 查询数据2
    def find_data2(self):
        params = self.req.dict_req
        params['limit'] = int(params['limit']) if 'limit' in params else 10
        params['page'] = int(params['page']) if 'page' in params else 1
        sql = 'select pon_name, count(*) as num from (select pon_name, password from light_power_list group by pon_name, password) t group by pon_name order by num desc limit 0,200'
        result = self.mysqldb.find_data(self.table_name, params, sql)
        # print(result)
        if result:
            dict_res = {'code': 200, 'msg': '操作成功', 'rows': result['rows']}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))