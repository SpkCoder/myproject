# -*- coding: utf-8 -*-
from flask import make_response
from flaskApp.my_modules import mysqldb
import json
import time
import re
import os
import shutil
import asyncio

def operation(req):

    # 查询数据
    def build():
        # vue-cli-admin打包
        build_path = "/home/myproject/flaskApp-ElementUI/flaskApp/static/vue-cli-admin/build/build.js"
        print(build_path)
        os.system("node " + build_path)
        return make_response('Success')

    # GET请求
    if req.method == 'GET':
        print(req.args)
        return build()

    return make_response('Error')