# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json
import time


#http://localhost:3000/python/http_test?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据
#http://localhost:3000/python/http_test?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据
#http://localhost:3000/python/http_test?action=updateData&whereStr=id=1&updateJson={"name":"xx"}  //修改数据
#http://localhost:3000/python/http_test?action=delData&dataArr=[1,3,5]  //删除数据
#http://localhost:3000/python/http_test?action=addCol&dataJson={"fieldName":"num","dataType":"INT"}  //插入列
#http://localhost:3000/python/http_test?action=updateCol&dataJson={"fieldName":"num","fieldNewName":"meg","dataNewType":"TEXT"}  //修改列
#http://localhost:3000/python/http_test?action=delCol&dataJson={"fieldName":"num"}  //删除列


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
            dict_json = {'code': 0, 'msg': '', 'count': result['count'], 'prePageNum': pre_page_num, 'currPage': curr_page, 'rows': result['rows']}
            return make_response(json.dumps(dict_json))
        else:
            return make_response('操作失败')


    # 插入数据
    def insert_data():
        if 'dataArr' in req.form:
            try:
                list_data = json.loads(req.form['dataArr'])
                if len(list_data) == 0:
                    return make_response('dataArr错误')
            except:
                return make_response('dataArr错误')
        else:
            return make_response('dataArr错误')

        for item in list_data:
            item['create_name'] = dict_login['username']
            item['create_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        result = mysqldb.insert_data(table_name, list_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 修改数据
    def update_data():
        if 'whereStr' in req.form:
            str_where = req.form['whereStr']
            if not str_where:
                return make_response('whereStr错误')
        else:
            return make_response('whereStr错误')

        if 'updateJson' in req.form:
            try:
                dict_update = json.loads(req.form['updateJson'])
                if len(dict_update) == 0:
                    return make_response('updateJson错误')
            except:
                return make_response('updateJson错误')
        else:
            return make_response('updateJson错误')

        dict_update['update_name'] = dict_login['username']
        dict_update['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        result = mysqldb.update_data(table_name, str_where, dict_update)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 删除数据
    def del_data():
        if 'dataArr' in req.form:
            try:
                list_data = json.loads(req.form['dataArr'])
                if len(list_data) == 0:
                    return make_response('dataArr错误')
            except:
                return make_response('dataArr错误')
        else:
            return make_response('dataArr错误')


        result = mysqldb.del_data(table_name, list_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 插入列
    def add_col():
        if 'dataJson' in req.form:
            try:
                dict_data = json.loads(req.form['dataJson'])
            except:
                return make_response('dataJson错误')
        else:
            return make_response('dataJson错误')

        if not dict_data['fieldName'] and not dict_data['dataType']:
            return make_response('dataJson错误')

        str_data = 'add ' + dict_data['fieldName'] + ' ' + dict_data['dataType'] + ' not null'
        result = mysqldb.update_col(table_name, str_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')

    # 修改列
    def update_col():
        if 'dataJson' in req.form:
            try:
                dict_data = json.loads(req.form['dataJson'])
            except:
                return make_response('dataJson错误')
        else:
            return make_response('dataJson错误')

        if not dict_data['fieldName'] and not dict_data['fieldNewName']:
            return make_response('dataJson错误')

        str_data = 'change ' + dict_data['fieldName'] + ' ' + dict_data['fieldNewName']
        if dict_data['dataNewType']:
            str_data += ' ' + dict_data['dataNewType']

        result = mysqldb.update_col(table_name, str_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')

    # 删除列
    def del_col():
        if 'dataJson' in req.form:
            try:
                dict_data = json.loads(req.form['dataJson'])
            except:
                return make_response('dataJson错误')
        else:
            return make_response('dataJson错误')

        if not dict_data['fieldName']:
            return make_response('dataJson错误')

        str_data = 'drop ' + dict_data['fieldName']

        result = mysqldb.update_col(table_name, str_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # GET请求
    if req.method == 'GET':
        print(req.args)
        if req.args['action'] == 'findData':
            return find_data()
        else:
            return make_response('action错误')

    # POST请求
    if req.method == 'POST':
        print(req.form)
        if req.form['action'] == 'insertData':
            return insert_data()
        elif req.form['action'] == 'updateData':
            return update_data()
        elif req.form['action'] == 'delData':
            return del_data()
        elif req.form['action'] == 'addCol':
            return add_col()
        elif req.form['action'] == 'updateCol':
            return update_col()
        elif req.form['action'] == 'delCol':
            return del_col()
        else:
            return make_response('action错误')

    return make_response('action错误')