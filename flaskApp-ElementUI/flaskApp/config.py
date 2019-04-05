# -*- coding: utf-8 -*-
from flaskApp import app
from datetime import timedelta

app.config['ENV'] = 'development'
# app.config['ENV'] = 'production'

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)  #设置缓存时间1s
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024            #设置上传文件100M
app.config['UPLOAD_FOLDER'] = '/static/uploadFile'     #设置上传文件路径

if app.config['ENV'] == 'development':
    app.config['DEBUG'] = False
    app.config['dbArgs'] = {'host': 'localhost', 'user': 'root', 'password': '', 'port': '3306', 'database': 'mydb'}
else:
    app.config['DEBUG'] = False
    app.config['dbArgs'] = {'host': 'localhost', 'user': 'root', 'password': '123456xx', 'port': '3306', 'database': 'mydb'}
