# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json


#http://localhost:3000/python/record_list?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据


class model(object):
    def __init__(self,req):
        self.req = req 
        self.table_name = 'model_list'

    # 分配方法
    def actions(self):
        # GET请求
        if self.req.method == 'GET':
            print(self.req.args)
            if self.req.args['action'] == 'findData':
                return self.find_data()
            else:
                return make_response('action错误')

        # POST请求
        elif self.req.method == 'POST':
            return make_response('None POST')

        else:
            return make_response('method错误')

    # 查询数据
    def find_data(self):
        str_where = ''
        str_field = ''
        str_sort = 'level ASC, sort ASC'
        pre_page_num = 0
        curr_page = 0
        args = {'pre_page_num': pre_page_num, 'curr_page': curr_page, 'sort': str_sort}
        result = mysqldb.find_data(self.table_name, str_where, str_field, args)
        # print(result)

        if result:
            list_rows = []
            for item in result['rows']:
                item['children'] = []
                if item['level'] == 1:
                    list_rows.append(item)
                elif item['level'] == 2:
                    for item2 in list_rows:
                        if item['parentId'] == item2['id']:
                            item2['children'].append(item)
                else:
                    pass

            dict_json = {'code': 0, 'msg': '', 'name_ch': '菜单', 'name': 'menu', 'rows': list_rows}
            return make_response(json.dumps(dict_json, ensure_ascii=False))
        else:
            return make_response('操作失败')

