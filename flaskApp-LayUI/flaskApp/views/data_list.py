# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json
import time
import re
import os
import shutil
# import uwsgi

#http://localhost:3000/python/http_test?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据
#http://localhost:3000/python/http_test?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据
#http://localhost:3000/python/http_test?action=updateData&whereStr=id=1&updateJson={"name":"xx"}  //修改数据
#http://localhost:3000/python/http_test?action=delData&whereJson={"id":[1,3,5]}  //删除数据


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


    # 查询处理过的数据
    def find_data_all():
        if 'whereStr' in req.args:
            str_where = req.args['whereStr']
        else:
            str_where = ''

        # 获取表头数据
        list_head = mysqldb.get_head(str_where)

        if list_head and len(list_head) >= 0:
            name = 'dataList'
            name_ch = '数据列表'
            field_ch = '模块ID;数据表名称;数据表中文名;中文字段集合;英文字段集合;字段数据类型集合;字段列宽集合;字段排序集合'
            field_en = 'id;name;name_ch;field_ch;field_en;data_type;field_width;field_sort'
            data_type = 'int(6);text;text;text;text;int;int'
            field_width = '100;100;150;200;200;200;200;200'
            field_sort = '1;2;3;4;5;6;7;8'
            dict_json = {'code': 0, 'msg': '', 'count': len(list_head), 'prePageNum': 100000,
                             'currPage': 1, 'name': name, 'name_ch': name_ch,
                             'field_ch': field_ch, 'field_en': field_en,
                             'data_type': data_type, 'field_width': field_width,
                             'field_sort': field_sort, 'rows': list_head}
            return make_response(json.dumps(dict_json, ensure_ascii=False))
        else:
            return make_response('操作失败')


    # 复制前后端代码文件
    def copy_file_fn(this_table_name):
        file_src_html = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/static/page/page_demo.html")
        file_dest_html = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/static/page/" + this_table_name + ".html")
        file_src_py = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/views/page_demo.py")
        file_dest_py = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/views/" + this_table_name + ".py")
        if not os.path.exists(file_dest_html):
            shutil.copyfile(file_src_html, file_dest_html)
            print("复制" + this_table_name + ".html成功")
        if not os.path.exists(file_dest_py):
            shutil.copyfile(file_src_py, file_dest_py)
            print("复制" + this_table_name + ".py成功")

        # 给routerUrl.js添加routerUrl
        file_routerUrl = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/static/js/router/routerUrl.js")
        with open(file_routerUrl, 'r+') as f:
            data = f.read()
            list_router_url = json.loads(data.split(" = ")[1])
            router_url_this = "/page/" + this_table_name
            list_router_url.append(router_url_this)
            router_url_str = "var routerUrl = " + json.dumps(list_router_url)
            f.seek(0, 0)
            f.truncate()
            f.write(router_url_str)
            print("写入routerUrl.js成功")
        f.closed

        # 给urls.py添加给url
        file_urls = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/urls.py")
        with open(file_urls, 'r+') as f:
            data = f.read()
            data = re.sub(r'\'', '"', data.split(" = ")[1])
            dict_url = json.loads(data)
            url_this = "/python/" + this_table_name
            dict_url[url_this] = "flaskApp.views." + this_table_name
            dict_url_str = "dict_url = " + json.dumps(dict_url)
            dict_url_str = re.sub(r'"', '\'', dict_url_str)
            f.seek(0, 0)
            f.truncate()
            f.write(dict_url_str)
            print("写入urls.py成功")
        f.closed

        # 重启server
        # uwsgi.reload()
        print("重启server")
        return make_response('操作成功')

    # 删除前后端代码文件
    def remove_file_fn(this_table_name):
        file_dest_html = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/static/page/" + this_table_name + ".html")
        file_dest_py = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/views/" + this_table_name + ".py")
        if os.path.exists(file_dest_html):
            os.remove(file_dest_html)
            print("删除" + this_table_name + ".html成功")
        if os.path.exists(file_dest_py):
            os.remove(file_dest_py)
            print("删除" + this_table_name + ".py成功")

        # 给routerUrl.js删除routerUrl
        file_routerUrl = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/static/js/router/routerUrl.js")
        with open(file_routerUrl, 'r+') as f:
            data = f.read()
            list_router_url = json.loads(data.split(" = ")[1])
            router_url_this = '/page/' + this_table_name
            list_router_url.remove(router_url_this)
            router_url_str = "var routerUrl = " + json.dumps(list_router_url)
            f.seek(0, 0)
            f.truncate()
            f.write(router_url_str)
            print("写入routerUrl.js成功")
        f.closed

        # 给urls.py删除给url
        file_urls = os.path.normpath(os.path.dirname(os.path.dirname(__file__)) + "/urls.py")
        with open(file_urls, 'r+') as f:
            data = f.read()
            data = re.sub(r'\'', '"', data.split(" = ")[1])
            dict_url = json.loads(data)
            url_this = '/python/' + this_table_name
            del dict_url[url_this]
            dict_url_str = "dict_url = " + json.dumps(dict_url)
            dict_url_str = re.sub(r'"', '\'', dict_url_str)
            f.seek(0, 0)
            f.truncate()
            f.write(dict_url_str)
            print("写入urls.py成功")
        f.closed

        # 重启server
        # uwsgi.reload()
        print("重启server")
        return make_response('操作成功')

    # 插入list_data
    def insert_data_fn(list_data):
        result = mysqldb.insert_data(table_name, list_data)
        # print(result)
        if result:
            print('插入list_data成功')

            # 操作记录
            content = 'dataArr=' + re.sub(r'\"', "'", json.dumps(list_data, ensure_ascii=False))
            dict_record = {'username': dict_login['username'], 'dbName': table_name, 'action': '增加', 'content': content,
                           'os': dict_login['os'], 'px': dict_login['px'], 'ip': req.remote_addr,
                           'time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}
            mysqldb.set_record(dict_record)

            return make_response('操作成功')
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

        if len(list_data) > 1:
            return make_response('不支持批量插入')
        str_field_en = '('
        for index, item in enumerate(list_data):
            if item['field_en'] == 'id':
                item['data_type'] = 'int'
                item['field_width'] = 100
                item['field_sort'] = 1
            item['create_name'] = dict_login['username']
            item['create_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            item['update_name'] = ''
            item['update_time'] = ''
            item['modelId'] = item['id']
            del item['id']

            if len(str(item['modelId'])) != 6:
                return make_response('modelId长度必须为6')
            if re.compile(r'^[A-Za-z]+_[A-Za-z]+$').match(item['name']) == None:
                return make_response('数据表名必须为字母_字母组成')
            if item['name'] == 'page_demo':
                return make_response('该数据表名已被占用')
            if not item['field_ch']:
                return make_response('中文字段不能为空')
            if not item['data_type']:
                return make_response('字段数据类型不能为空')
            if re.compile(r'^\w+$').match(item['field_en']) == None:
                return make_response('英文字段必须为字母\数字\下划线')
            if re.compile(r'^[1-9][0-9]*$').match(str(item['field_width'])) == None:
                return make_response('字段列宽必须为正整数')
            if re.compile(r'^[1-9][0-9]*$').match(str(item['field_sort'])) == None:
                return make_response('字段排序必须为正整数')
            str_field_en += '"' + item['field_en'] + '"'
            if index < len(list_data) - 1:
                str_field_en += ','

        str_field_en += ')'
        #查询字段是否存在
        str_where = 'modelId=' + str(list_data[0]['modelId']) + ' and field_en in' + str_field_en
        str_field = 'modelId,field_en'
        args = {'pre_page_num': 1, 'curr_page': 1, 'sort': ''}
        result = mysqldb.find_data(table_name, str_where, str_field, args)
        if result['count'] > 0:
            return make_response('字段名已存在')

        this_table_name = list_data[0]['name']
        if list_data[0]['field_en'] == 'id':
            # 创建数据表
            result = mysqldb.create_table(this_table_name)
            if not result:
                return make_response('操作失败')
            print("创建数据表完成")
            insert_data_fn(list_data)
            return copy_file_fn(this_table_name)
        else:
            # 给数据表插入列
            if list_data[0]['data_type'] == 'int' or list_data[0]['data_type'] == 'int(6)':
                data_type = list_data[0]['data_type']
            elif list_data[0]['data_type'] == 'textarea':
                data_type = 'VARCHAR(3000)'
            elif list_data[0]['data_type'] == 'decimal(2)' or list_data[0]['data_type'] == 'decimal(4)':
                data_type = 'FLOAT'
            else:
                data_type = 'VARCHAR(100)'
            str_data = 'add ' + list_data[0]['field_en'] + ' ' + data_type + ' not null'
            result = mysqldb.update_col(this_table_name, str_data)
            print("插入列完成")
            if not result:
                return make_response('操作失败')
            return insert_data_fn(list_data)

    # 修改数据
    def update_data_fn(table_name, str_where, dict_update):
        result = mysqldb.update_data(table_name, str_where, dict_update)
        # print(result)

        if result:
            # 操作记录
            content = 'whereStr=' + re.sub(r'\"', "'", str_where) + '&updateJson=' + re.sub(r'\"', "'",
                                                                                            json.dumps(dict_update,
                                                                                                       ensure_ascii=False))
            dict_record = {'username': dict_login['username'], 'dbName': table_name, 'action': '修改', 'content': content,
                           'os': dict_login['os'], 'px': dict_login['px'], 'ip': req.remote_addr,
                           'time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}
            mysqldb.set_record(dict_record)

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
                if 'id' in dict_update:
                    return make_response('updateJson错误')
            except:
                return make_response('updateJson错误')
        else:
            return make_response('updateJson错误')

        if not dict_update['field_ch']:
            return make_response('中文字段不能为空')

        if not dict_update['data_type']:
            return make_response('字段数据类型不能为空')

        if re.compile(r'^\w+$').match(dict_update['field_en']) == None:
            return make_response('英文字段必须为字母\数字\下划线')

        if re.compile(r'^[1-9][0-9]*$').match(str(dict_update['field_width'])) == None:
            return make_response('字段列宽必须为正整数')

        if re.compile(r'^[1-9][0-9]*$').match(str(dict_update['field_sort'])) == None:
            return make_response('字段排序必须为正整数')

        if dict_update['field_en'] == 'id':
            return make_response('该字段不能修改')

        dict_update['update_name'] = dict_login['username']
        dict_update['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        str_field = 'name,modelId,field_en'
        args = {'pre_page_num': 1, 'curr_page': 1, 'sort': ''}
        result = mysqldb.find_data(table_name, str_where, str_field, args)
        if result['rows'][0]['field_en'] == dict_update['field_en']:
            return update_data_fn(table_name, str_where, dict_update)
        else:
            this_table_name = result['rows'][0]['name']

            # 查询字段是否存在
            this_str_where = 'modelId=' + str(result['rows'][0]['modelId']) + ' and field_en="' + dict_update['field_en'] + '"'
            str_field = 'field_en'
            args = {'pre_page_num': 1, 'curr_page': 1, 'sort': ''}
            this_result = mysqldb.find_data(table_name, this_str_where, str_field, args)
            if this_result['count'] > 0:
                return make_response('字段已存在')

            # 修改列
            if dict_update['data_type'] == 'int' or dict_update['data_type'] == 'int(6)':
                data_type = dict_update['data_type']
            else:
                data_type = 'VARCHAR(100)'
            str_data = 'change ' + result['rows'][0]['field_en'] + ' ' + dict_update['field_en'] + ' ' + data_type + ' not null'
            result = mysqldb.update_col(this_table_name, str_data)
            if not result:
                return make_response('操作失败')
            return update_data_fn(table_name, str_where, dict_update)


    def delete_data_fn(table_name, dict_where):
        result = mysqldb.del_data(table_name, dict_where)
        # print(result)

        if result:
            # 操作记录
            content = 'whereJson=' + re.sub(r'\"', "'", json.dumps(dict_where, ensure_ascii=False))
            dict_record = {'username': dict_login['username'], 'dbName': table_name, 'action': '删除', 'content': content,
                           'os': dict_login['os'], 'px': dict_login['px'], 'ip': req.remote_addr,
                           'time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}
            mysqldb.set_record(dict_record)

            return make_response('操作成功')
        else:
            return make_response('操作失败')

    # 删除数据
    def del_data():
        if 'whereJson' in req.form:
            try:
                dict_where = json.loads(req.form['whereJson'])
                if len(dict_where) != 1:
                    return make_response('whereJson错误')
            except:
                return make_response('whereJson错误')
        else:
            return make_response('whereJson错误')

        if 'id' in dict_where:
            str_where = 'id=' + str(dict_where['id'][0])
        else:
            str_where = 'modelId=' + str(dict_where['modelId'][0])
        str_field = 'name,field_en'
        args = {'pre_page_num': 1, 'curr_page': 1, 'sort': ''}
        result = mysqldb.find_data(table_name, str_where, str_field, args)
        this_table_name = result['rows'][0]['name']
        if 'id' in dict_where:
            # 删除列
            str_data = 'drop ' + result['rows'][0]['field_en']
            result = mysqldb.update_col(this_table_name, str_data)
            if not result:
                return make_response('操作失败')
            return delete_data_fn(table_name, dict_where)

        else:
            # 删除表
            result = mysqldb.drop_table(this_table_name)
            if not result:
                return make_response('操作失败')
            print("删除数据表完成")
            delete_data_fn(table_name, dict_where)
            return remove_file_fn(this_table_name)


    # GET请求
    if req.method == 'GET':
        print(req.args)

        # 判断权限
        if req.args['action'] == 'findDataAll':
            action2 = 'findData'
        else:
            action2 = req.args['action']
        if not mysqldb.get_power(dict_login['username'], dict_login['hash'], table_name, action2):
            return make_response('没有权限')

        if req.args['action'] == 'findData':
            return find_data()
        elif req.args['action'] == 'findDataAll':
            return find_data_all()
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
        elif req.form['action'] == 'updateData':
            return update_data()
        elif req.form['action'] == 'delData':
            return del_data()
        else:
            return make_response('action错误')

    return make_response('action错误')