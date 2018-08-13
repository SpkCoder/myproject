from flaskApp import app
from flask import request, redirect
from flaskApp.urls import dict_url
import os


@app.route('/')
def index():
    if request.cookies.get('logining'):
        file_path = os.path.join(os.path.dirname(__file__), 'static\\index.html')
        with open(file_path, encoding='utf-8') as file:
            data = file.read()
            return data
    else:
        file_path = os.path.join(os.path.dirname(__file__), 'static\\login.html')
        with open(file_path, encoding='utf-8') as file:
            data = file.read()
            return data


@app.route('/favicon.ico')
def favicon():
    return redirect('/static/favicon.ico')


@app.route('/python/<arg>', methods=['GET', 'POST'])
def require(arg):
    if request.cookies.get('logining'):
        req_url = '/python/' + arg
        if req_url in dict_url:
            ip_module = __import__(dict_url[req_url], fromlist=["*"])
            return ip_module.operation(request)
        else:
            return redirect('/static/error.html')
    else:
        if arg == 'login':
            ip_module = __import__(dict_url['/python/login'], fromlist=["*"])
            return ip_module.operation(request)
        else:
            return '没有登录，请先登录！'


@app.errorhandler(404)
def page_not_found(error):
    return redirect('/static/error.html')