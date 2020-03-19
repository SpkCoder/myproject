# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.modules import db_mysql
import json
import time
import re


#/api/python/light_distance_list req_data { "action":"findData", "limit":10, "page":1, "whereJson":{}, "tocken": "" }  //查询数据


class model(object):
    def __init__(self,req):
        self.req = req 
        self.table_name = 'light_distance_list'
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
        whereStr = 'where pon_name = "'+params['whereJson']['pon_name']+'"'
        sql = 'select password, pon_name from light_power_list '+whereStr+' group by password order by time asc'
        result = self.mysqldb.find_data(self.table_name, params, sql)
        # print(result)
        if result:
            list_password = []
            for item in result['rows']:
                list_password.append(item['password'])
            str_password = str(tuple(list_password))
            if len(list_password) > 1:
                str_password = str_password.replace(r'\'', '"')
                whereStr = 'where password in '+str_password
            else:
                str_password = str_password.replace(r'\'', '"')
                str_password = str_password.replace(r'\,', '')
                whereStr = 'where password in '+str_password
            sql = 'select password, distance from light_distance_list '+whereStr+' group by password'
            result_distance = self.mysqldb.find_data(self.table_name, params, sql)
            dict_password_distance = {}
            for item in result_distance['rows']:
                dict_password_distance[item['password']] = item['distance']
            for item in result['rows']:
                if item['password'] in dict_password_distance:
                    item['distance'] = dict_password_distance[item['password']]
                else:
                    item['distance'] = 0
            dict_res = {'code': 200, 'msg': '操作成功', 'result': result}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
