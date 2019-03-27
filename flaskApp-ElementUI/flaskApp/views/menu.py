# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json


#http://localhost:3000/python/record_list?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据


def operation(req):
    table_name = 'model_list'
    dict_login = json.loads(req.cookies['logining'])

    # 查询数据
    def find_data():
        str_where = ''
        str_field = ''
        str_sort = 'level ASC, sort ASC'
        pre_page_num = 0
        curr_page = 0
        args = {'pre_page_num': pre_page_num, 'curr_page': curr_page, 'sort': str_sort}
        result = mysqldb.find_data(table_name, str_where, str_field, args)
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


    # GET请求
    if req.method == 'GET':
        print(req.args)
        if req.args['action'] == 'findData':
            return find_data()
        else:
            return make_response('action错误')

    return make_response('action错误')