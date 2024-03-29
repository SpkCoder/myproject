from flaskApp import app
from flask import request, redirect
from flaskApp.urls import dict_url
from flask_cors import CORS
import os

# 允许跨越
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    file_path = os.path.join(os.path.dirname(__file__), 'static/index.html')
    with open(file_path, encoding='utf-8') as file:
        data = file.read()
        return data


@app.route('/favicon.ico')
def favicon():
    return redirect('/static/favicon.ico')


@app.route('/python/<arg>', methods=['GET', 'POST'])
def require(arg):
    req_url = '/python/' + arg
    if req_url in dict_url:
        ip_module = __import__(dict_url[req_url], fromlist=["*"])
        return ip_module.operation(request)
    else:
        return redirect('/static/error.html')


@app.errorhandler(404)
def page_not_found(error):
    return redirect('/static/error.html')