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

        upload_files = req.files.getlist("file")
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
            list_data[i]['create_name'] = dict_login['username']
            list_data[i]['create_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        # print(list_data)
        result = mysqldb.insert_data(table_name, list_data)
        # print(result)

        if result:
            # 操作记录
            content = 'dataArr=' + re.sub(r'\"', "'", json.dumps(list_data, ensure_ascii=False))
            dict_record = {'username': dict_login['username'], 'dbName': table_name, 'action': '上传文件', 'content': content, 'os': dict_login['os'], 'px': dict_login['px'], 'ip': req.remote_addr, 'time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}
            mysqldb.set_record(dict_record)

            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # 删除文件
    def del_data():
        if 'whereJson' in req.form:
            try:
                dict_where = json.loads(req.form['whereJson'])
                if not dict_where['url']:
                    return make_response('whereJson错误')
            except:
                return make_response('whereJson错误')
        else:
            return make_response('whereJson错误')

        result = mysqldb.del_data(table_name, dict_where)
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
            dict_record = {'username': dict_login['username'], 'dbName': table_name, 'action': '删除文件', 'content': content, 'os': dict_login['os'], 'px': dict_login['px'], 'ip': req.remote_addr, 'time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}
            mysqldb.set_record(dict_record)

            return make_response('操作成功')
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

    # POST请求
    if req.method == 'POST':
        print(req.form)

        # 判断权限
        if not mysqldb.get_power(dict_login['username'], dict_login['hash'], table_name, req.form['action']):
            return make_response('没有权限')

        if req.form['action'] == 'insertData':
            return insert_data()
        elif req.form['action'] == 'delData':
            return del_data()
        else:
            return make_response('action错误')

    return make_response('action错误')