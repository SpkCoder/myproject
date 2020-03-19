# -*- coding: utf-8 -*-
from flaskApp.config.config import *
from flaskApp import app
from flask import request, redirect, make_response
from flaskApp.urls import dict_url
from flask_cors import CORS
from datetime import timedelta
import logging
import os
import json
import jwt

#config
app.config['ENV'] = env_name
app.config['DEBUG'] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)  #设置缓存时间1s

#logging config
logging.basicConfig(level=logging.DEBUG,
                format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                datefmt='%a, %d %b %Y %H:%M:%S',
                filename= './logs/out.log',
                filemode='w'
                )

# 允许跨越
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    file_path = os.path.join(os.path.dirname(__file__), 'static/index.html')
    with open(file_path, encoding='utf-8') as file:
        data = file.read()
        return data

@app.route('/api/python/<arg>', methods=['GET', 'POST'])
def require(arg):
    #验证request json
    logging.info('request: /api/python/' + str(arg))
    try:
        if request.args:
            dict_req = json.loads(request.args['params'])
        elif request.form:
            dict_req = json.loads(request.form['params'])
        else:
            dict_req = json.loads(request.get_data())
        logging.info(dict_req)
    except Exception as e:
        logging.debug('request json error: ' + str(e))
        dict_res = {'code': 500, 'msg': 'request json error'}
        return make_response(json.dumps(dict_res, ensure_ascii=False))
    request.dict_req = dict_req
    req_url = '/api/python/' + arg
    if req_url in dict_url:
        import_module = __import__(dict_url[req_url], fromlist=["*"])
        return import_module.model(request).actions()
    else:
        return redirect('/static/error.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect('/static/error.html')