# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
from flaskApp import app
import json
import time
import re
import os


#http://localhost:3000/python/http_test?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据
#http://localhost:3000/python/http_test?action=insertData&dataArr=[{"class_name":"图库"},{"class_name":"图库"}]&fileArr=[file,file]  //上传文件
#http://localhost:3000/python/http_test?action=delData&whereJson={"url":[url1,url2]}  //删除文件


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

            # 判断权限
            if not mysqldb.get_power(self.dict_login['username'], self.dict_login['hash'], self.table_name, self.req.args['action']):
                return make_response('没有权限')

            if self.req.args['action'] == 'findData':
                return self.find_data()
            else:
                return make_response('action错误')

        # POST请求
        elif self.req.method == 'POST':
            print(self.req.form)

            # 判断权限
            if not mysqldb.get_power(self.dict_login['username'], self.dict_login['hash'], self.table_name, self.req.form['action']):
                return make_response('没有权限')

            if self.req.form['action'] == 'insertData':
                return self.insert_data()
            elif self.req.form['action'] == 'delData':
                return self.del_data()
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
            # 获取表头数据
            list_head = mysqldb.get_head('name="' + self.table_name + '"')

            if list_head and len(list_head) > 0:
                dict_json = {'code': 0, 'msg': '', 'count': result['count'], 'prePageNum': pre_page_num,
                             'currPage': curr_page, 'name': list_head[0]['name'], 'name_ch': list_head[0]['name_ch'],
                             'field_ch': list_head[0]['field_ch'], 'field_en': list_head[0]['field_en'],
                             'data_type': list_head[0]['data_type'], 'field_width': list_head[0]['field_width'],
                             'field_sort': list_head[0]['field_sort'], 'rows': result['rows']}
            else:
                dict_json = {'code': 0, 'msg': '', 'count': result['count'], 'prePageNum': pre_page_num,
                             'currPage': curr_page, 'name': '', 'name_ch': '', 'field_ch': '', 'field_en': '',
                             'data_type': '', 'field_width': '', 'field_sort': '', 'rows': result['rows']}

            return make_response(json.dumps(dict_json, ensure_ascii=False))
        else:
            return make_response('操作失败')


    # 上传文件
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

        upload_files = self.req.files.getlist("file")
        for i, file in enumerate(upload_files):
            now_time = time.strftime("%Y-%m-%d-%H-%M-%S", time.localtime()) + "-" + str(time.time())[11:15]
            now_path = os.path.dirname(os.path.dirname(__file__)) + "/static/uploadFile/" + now_time + "___" + file.filename
            if not os.path.exists(now_path):
                file.save(now_path)
            else:
                pass
            url = "/static/uploadFile/" + now_time + "___" + file.filename
            list_data[i]['name'] = file.filename
            list_data[i]['size'] = os.path.getsize(now_path)
            list_data[i]['url'] = url
            list_data[i]['create_name'] = self.dict_login['username']
            list_data[i]['create_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        # print(list_data)
        result = mysqldb.insert_data(self.table_name, list_data)
        # print(result)

        if result:
            # 操作记录
            content = 'dataArr=' + re.sub(r'\"', "'", json.dumps(list_data, ensure_ascii=False))
            dict_record = {'username': self.dict_login['username'], 'dbName': self.table_name, 'action': '上传文件', 'content': content, 'os': self.dict_login['os'], 'px': self.dict_login['px'], 'ip': self.req.remote_addr, 'time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}
            mysqldb.set_record(dict_record)

            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 删除文件
    def del_data(self):
        if 'whereJson' in self.req.form:
            try:
                dict_where = json.loads(self.req.form['whereJson'])
                if not dict_where['url']:
                    return make_response('whereJson错误')
            except:
                return make_response('whereJson错误')
        else:
            return make_response('whereJson错误')

        result = mysqldb.del_data(self.table_name, dict_where)
        # print(result)

        if result:
            for url in dict_where['url']:
                file_path = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + url)
                if os.path.exists(file_path):
                    os.remove(file_path)
                else:
                    pass

            # 操作记录
            content = 'whereJson=' + re.sub(r'\"', "'", json.dumps(dict_where, ensure_ascii=False))
            dict_record = {'username': self.dict_login['username'], 'dbName': self.table_name, 'action': '删除文件', 'content': content, 'os': self.dict_login['os'], 'px': self.dict_login['px'], 'ip': self.req.remote_addr, 'time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}
            mysqldb.set_record(dict_record)

            return make_response('操作成功')
        else:
            return make_response('操作失败')

