# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json
import time

#http://localhost:3000/python/http_test?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据
#http://localhost:3000/python/http_test?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据
#http://localhost:3000/python/http_test?action=updateData&whereStr=id=1&updateJson={"name":"xx"}  //修改数据
#http://localhost:3000/python/http_test?action=delData&whereJson={"id":[1,3,5]}  //删除数据
#http://localhost:3000/python/http_test?action=addCol&dataJson={"fieldName":"num","dataType":"INT"}  //插入列
#http://localhost:3000/python/http_test?action=updateCol&dataJson={"fieldName":"num","fieldNewName":"meg","dataNewType":"TEXT"}  //修改列
#http://localhost:3000/python/http_test?action=delCol&dataJson={"fieldName":"num"}  //删除列
#http://localhost:3000/python/http_test?action=delCol&dataJson={"to":"1533165085@qq.com","subject":"nodemailer测试","html":"<h2>hello</h2>"}  //发送邮件


class model(object):
    def __init__(self,req):
        self.req = req 
        self.table_name = self.req.path[8:] 
        self.dict_login = json.loads(self.req.cookies['logining'])

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
            print(self.req.form)
            if self.req.form['action'] == 'insertData':
                return self.insert_data()
            elif self.req.form['action'] == 'updateData':
                return self.update_data()
            elif self.req.form['action'] == 'delData':
                return self.del_data()
            elif self.req.form['action'] == 'addCol':
                return self.add_col()
            elif self.req.form['action'] == 'updateCol':
                return self.update_col()
            elif self.req.form['action'] == 'delCol':
                return self.del_col()
            else:
                return make_response('action错误')

        else:
            return make_response('method错误')


    # 查询数据
    def find_data(self):

        if 'whereStr' in self.req.args:
            str_where = self.req.args['whereStr']
        else:
            str_where = ''

        if 'fieldStr' in self.req.args:
            str_field = self.req.args['fieldStr']
        else:
            str_field = ''

        if 'sortStr' in self.req.args:
            str_sort = self.req.args['sortStr']
        else:
            str_sort = ''

        if 'prePageNum' in self.req.args:
            pre_page_num = int(self.req.args['prePageNum'])
        else:
            pre_page_num = 0

        if 'currPage' in self.req.args:
            curr_page = int(self.req.args['currPage'])
        else:
            curr_page = 0

        args = {'pre_page_num': pre_page_num, 'curr_page': curr_page, 'sort': str_sort}
        result = mysqldb.find_data(self.table_name, str_where, str_field, args)
        # print(result)

        if result:
            dict_json = {'code': 0, 'msg': '', 'count': result['count'], 'prePageNum': pre_page_num, 'currPage': curr_page, 'rows': result['rows']}
            return make_response(json.dumps(dict_json))
        else:
            return make_response('操作失败')


    # 插入数据
    def insert_data(self):
        if 'dataArr' in self.req.form:
            try:
                list_data = json.loads(self.req.form['dataArr'])
                if len(list_data) == 0:
                    return make_response('dataArr错误')
            except:
                return make_response('dataArr错误')
        else:
            return make_response('dataArr错误')

        for item in list_data:
            item['create_name'] = self.dict_login['username']
            item['create_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        result = mysqldb.insert_data(self.table_name, list_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 修改数据
    def update_data(self):
        if 'whereStr' in self.req.form:
            str_where = self.req.form['whereStr']
            if not str_where:
                return make_response('whereStr错误')
        else:
            return make_response('whereStr错误')

        if 'updateJson' in self.req.form:
            try:
                dict_update = json.loads(self.req.form['updateJson'])
                if len(dict_update) == 0:
                    return make_response('updateJson错误')
            except:
                return make_response('updateJson错误')
        else:
            return make_response('updateJson错误')

        dict_update['update_name'] = self.dict_login['username']
        dict_update['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        result = mysqldb.update_data(self.table_name, str_where, dict_update)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 删除数据
    def del_data(self):
        if 'whereJson' in self.req.form:
            try:
                dict_where = json.loads(self.req.form['whereJson'])
                if len(dict_where) != 1:
                    return make_response('whereJson错误')
            except:
                return make_response('whereJson错误')
        else:
            return make_response('whereJson错误')


        result = mysqldb.del_data(self.table_name, dict_where)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 插入列
    def add_col(self):
        if 'dataJson' in self.req.form:
            try:
                dict_data = json.loads(self.req.form['dataJson'])
            except:
                return make_response('dataJson错误')
        else:
            return make_response('dataJson错误')

        if not dict_data['fieldName'] and not dict_data['dataType']:
            return make_response('dataJson错误')

        str_data = 'add ' + dict_data['fieldName'] + ' ' + dict_data['dataType'] + ' not null'
        result = mysqldb.update_col(self.table_name, str_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')

    # 修改列
    def update_col(self):
        if 'dataJson' in self.req.form:
            try:
                dict_data = json.loads(self.req.form['dataJson'])
            except:
                return make_response('dataJson错误')
        else:
            return make_response('dataJson错误')

        if not dict_data['fieldName'] and not dict_data['fieldNewName']:
            return make_response('dataJson错误')

        str_data = 'change ' + dict_data['fieldName'] + ' ' + dict_data['fieldNewName']
        if dict_data['dataNewType']:
            str_data += ' ' + dict_data['dataNewType']

        result = mysqldb.update_col(self.table_name, str_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')

    # 删除列
    def del_col(self):
        if 'dataJson' in self.req.form:
            try:
                dict_data = json.loads(self.req.form['dataJson'])
            except:
                return make_response('dataJson错误')
        else:
            return make_response('dataJson错误')

        if not dict_data['fieldName']:
            return make_response('dataJson错误')

        str_data = 'drop ' + dict_data['fieldName']

        result = mysqldb.update_col(self.table_name, str_data)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


