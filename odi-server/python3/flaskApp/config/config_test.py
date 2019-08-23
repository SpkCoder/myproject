# -*- coding:utf-8 -*-
#!/usr/bin/python

#测试环境的数据库配置

ESDB_HOST = 'es1' #'192.168.40.236'   #ES数据库地址
ESDB_PORT = 9200   #ES数据库端口号

DB_HOST = 'mysql' #'127.0.0.1'           #数据库地址
DB_USER_NAME = 'mysql'       #数据库连接用户名
DB_PASSWORD = 'mysql@123'    #数据库密码
DB_NAME = 'ott-dns-info'              #数据库名称
DB_PORT = 3306                        #数据库端口号
DB_CHARSET = 'utf8'                   #数据库编码方式
DB_INSERT_NUM = 1000

JWT_SECRET = 'jwtsecret123'     #tocken秘钥

DB_SQLITE_NAME = 'ott-dns-info.db'              #sqlite数据库名称
