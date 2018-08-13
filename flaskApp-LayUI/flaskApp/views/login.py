# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json
import time
import hashlib



# http://localhost:3000/python/login?action=SignIn&whereJson={"username":"tom","password":"tom123456"}&osJson={"os":"window","px":"1366x768"}  //登录
# http://localhost:3000/python/login?action=SignOut  //退出
# http://localhost:3000/python/login?action=updateData&whereJson={"username":"tom"}&updateJson={"password":"123456"}  //修改密码


def operation(req):
    table_name = 'user_list'

    # 登录
    def sign_in():
        if 'whereJson' in req.form:
            try:
                dict_where = json.loads(req.form['whereJson'])
            except:
                return make_response('whereJson错误')
        else:
            return make_response('whereJson错误')

        if 'osJson' in req.form:
            try:
                dict_os = json.loads(req.form['osJson'])
            except:
                return make_response('osJson错误')
        else:
            return make_response('osJson错误')

        if dict_where['username'] and len(dict_where['password']) >= 6:
            password = "pw" + dict_where['password'] + dict_where['password'][0:3]
            md5 = hashlib.md5()
            md5.update(password.encode(encoding='utf-8'))
            md5_password = md5.hexdigest()
            dict_where['password'] = md5_password
        else:
            return make_response('用户名和密码格式错误')
        print(dict_where)

        str_where = 'username="'+dict_where['username']+'" and password="'+dict_where['password']+'"'
        str_field = 'username,password'
        args = {}
        result = mysqldb.find_data(table_name, str_where, str_field, args)
        # print(result)
        if result:
            print(dict_where['username'] + "登录成功")
            os = dict_os['os'] or ""
            px = dict_os['px'] or ""
            ip = req.remote_addr

            res = make_response('登录成功')
            dict_json = {'username': dict_where['username'], 'hash': dict_where['password'], 'os': os, 'px': px, 'ip': ip }
            res.set_cookie('logining', json.dumps(dict_json), max_age=8*3600)
            return res
        else:
            return make_response('用户名或密码错误')


    # 退出
    def sign_out():
        dict_login = json.loads(req.cookies['logining'])
        print(dict_login)
        res = make_response('退出成功')
        res.delete_cookie("logining")
        print(dict_login['username'] + "退出成功")
        return res



    # 修改密码
    def update_data():
        if 'whereJson' in req.form:
            try:
                dict_where = json.loads(req.form['whereJson'])
            except:
                return make_response('whereJson错误')
        else:
            return make_response('whereJson错误')

        if 'updateJson' in req.form:
            try:
                dict_update = json.loads(req.form['updateJson'])
                if len(dict_update) == 0:
                    return make_response('updateJson错误')
            except:
                return make_response('updateJson错误')
        else:
            return make_response('updateJson错误')

        if 'username' not in dict_where:
            return make_response('updateJson错误')
        else:
            pass

        if dict_where['username'] != dict_login['username']:
            return make_response('没有权限')
        else:
            pass

        if len(dict_update['password']) >= 6:
            password = "pw" + dict_update['password'] + dict_update['password'][0:3]
            md5 = hashlib.md5()
            md5.update(password.encode(encoding='utf-8'))
            md5_password = md5.hexdigest()
            dict_update['password'] = md5_password
        else:
            return make_response('密码不能为空')

        dict_login = json.loads(req.cookies['logining'])
        str_where = 'username="' + dict_where['username'] + '"'
        dict_update['update_name'] = dict_login['username']
        dict_update['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        result = mysqldb.update_data(table_name, str_where, dict_update)
        # print(result)

        if result:
            return make_response('操作成功')
        else:
            return make_response('操作失败')


    # POST请求
    if req.method == 'POST':
        print(req.form)
        if req.form['action'] == 'SignIn':
            return sign_in()
        elif req.form['action'] == 'SignOut':
            return sign_out()
        elif req.form['action'] == 'updateData':
            return update_data()
        else:
            return make_response('action错误')

    return make_response('action错误')