# -*- coding:utf-8 -*-
#! /usr/bin/env python3


DB_HOST = '127.0.0.1'    #数据库地址  127.0.0.1
DB_USER_NAME = 'root'       #数据库连接用户名
DB_PASSWORD = 'ott@123456'    #数据库密码
DB_NAME = 'shares_db'              #数据库名称
DB_PORT = 3306                        #数据库端口号
DB_CHARSET = 'utf8'                   #数据库编码方式
DB_INSERT_NUM = 1000
SPLIT_NUMBER = 10000000         #table切割长度

JWT_SECRET = 'jwtsecret123'     #tocken秘钥

LOG_FILE = './logs/out.log'