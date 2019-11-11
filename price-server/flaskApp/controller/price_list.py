# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.modules import db_sqlite
import json
import time
import re


#/api/python/price_list req_data { "action":"findData", "limit":10, "page":1, "whereJson":{}, "tocken": "eyJhbGciOiJIUzIbmFtZSmei4" }  //查询数据
#/api/python/price_list req_data { "action":"insertData", "dataArr":[{"class_name":"超级用户"}], "tocken": "eb2xlX2lkIj4gphmei4" }  //插入数据
#/api/python/price_list req_data { "action":"updateData", "whereJson":{"id":"1"}, "updateJson":{"class_name":"超级用户"}, "tocken": "eb2xlX2lkIj4gphmei4" }  //修改数据
#/api/python/price_list req_data { "action":"delData", whereJson={"id":[1,3]}, "tocken": "eyJhbGciOiJIUzIbmFtZSmei4" }  //删除数据


class model(object):
    def __init__(self,req):
        self.req = req 
        self.table_name = 'price_list'
        self.mysqldb = db_sqlite.model()

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
        int_now = int(time.time())
        if params['whereJson']['group_type'] == '1D':
            str_gte = time.strftime('%Y-%m-%d 00:00:00', time.localtime(int_now-30*24*3600))
            whereStr = 'where time >= "'+str_gte+'"'
            sql = 'select strftime("%Y-%m-%d",time) as time2, type, name, price as price2 from price_list '+whereStr+' group by time2,type,name order by time2 asc'
        if params['whereJson']['group_type'] == '1M':
            str_gte = time.strftime('%Y-%m-00 00:00:00', time.localtime(int_now-12*30*24*3600))
            whereStr = 'where time >= "'+str_gte+'"'
            sql = 'select strftime("%Y-%m",time) as time2, type, name, round(avg(price),2) as price2 from price_list '+whereStr+' group by time2,type,name order by time2 asc'
        if params['whereJson']['group_type'] == '1Y':
            sql = 'select strftime("%Y",time) as time2, type, name, round(avg(price),2) as price2 from price_list group by time2,type,name order by time2 asc'
        result = self.mysqldb.find_data(self.table_name, params, sql)
        # print(result)

        if result:
            result['time'] = []
            result['type_name'] = {}
            for item in result['rows']:
                item['time'] = item['time2']
                item['price'] = item['price2']
                del item['time2']
                del item['price2']
                if item['type'] not in result['type_name']:
                    result['type_name'][item['type']] = {}
                else:
                    pass
                if item['name'] not in result['type_name'][item['type']]:
                    result['type_name'][item['type']][item['name']] = [item['price']]
                else:
                    result['type_name'][item['type']][item['name']].append(item['price'])
                if item['time'] not in result['time']:
                    result['time'].append(item['time'])
            del result['count']
            del result['rows']
            dict_res = {'code': 200, 'msg': '操作成功', 'info': result}
            return make_response(json.dumps(dict_res, ensure_ascii=False))
        else:
            dict_res = {'code': 500, 'msg': '操作失败'}
            return make_response(json.dumps(dict_res, ensure_ascii=False))