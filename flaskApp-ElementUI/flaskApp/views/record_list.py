# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json


#http://localhost:3000/python/record_list?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据


def operation(req):
    table_name = req.path[8:]
    dict_login = json.loads(req.cookies['logining'])

    # 查询数据
    def find_data():

        if 'whereStr' in req.args:
            str_where = req.args['whereStr']
        else:
            str_where = ''

        if 'fieldStr' in req.args:
            str_field = req.args['fieldStr']
        else:
            str_field = ''

        if 'sortStr' in req.args:
            str_sort = req.args['sortStr']
        else:
            str_sort = ''

        if 'prePageNum' in req.args:
            pre_page_num = int(req.args['prePageNum'])
        else:
            pre_page_num = 0

        if 'currPage' in req.args:
            curr_page = int(req.args['currPage'])
        else:
            curr_page = 0

        args = {'pre_page_num': pre_page_num, 'curr_page': curr_page, 'sort': str_sort}
        result = mysqldb.find_data(table_name, str_where, str_field, args)
        # print(result)

        if result:
            # 获取表头数据
            list_head = mysqldb.get_head('name="' + table_name + '"')

            if list_head and len(list_head) > 0:
                dict_json = {'code': 0, 'msg': '', 'count': result['count'], 'prePageNum': pre_page_num, 'currPage': curr_page, 'name': list_head[0]['name'], 'name_ch': list_head[0]['name_ch'], 'field_ch': list_head[0]['field_ch'], 'field_en': list_head[0]['field_en'], 'data_type': list_head[0]['data_type'], 'field_width': list_head[0]['field_width'], 'field_sort': list_head[0]['field_sort'], 'rows': result['rows']}
            else:
                dict_json = {'code': 0, 'msg': '', 'count': result['count'], 'prePageNum': pre_page_num, 'currPage': curr_page, 'name': '', 'name_ch': '', 'field_ch': '', 'field_en': '', 'data_type': '', 'field_width': '', 'field_sort': '', 'rows': result['rows']}

            return make_response(json.dumps(dict_json, ensure_ascii=False))
        else:
            return make_response('操作失败')


    # GET请求
    if req.method == 'GET':
        print(req.args)

        # 判断权限
        if not mysqldb.get_power(dict_login['username'], dict_login['hash'], table_name, req.args['action']):
            return make_response('没有权限')

        if req.args['action'] == 'findData':
            return find_data()
        else:
            return make_response('action错误')

    return make_response('action错误')