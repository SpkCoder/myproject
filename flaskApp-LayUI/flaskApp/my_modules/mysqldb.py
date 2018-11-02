# -*- coding: utf-8 -*-

import pymysql
import re
from flaskApp import app


# 连接数据库
def connect_db():
    try:
        db = pymysql.connect(app.config['dbArgs']['host'], app.config['dbArgs']['user'], app.config['dbArgs']['password'], app.config['dbArgs']['database'], charset='utf8')
        return db
    except:
        return 'Error'


# 创建数据表
def create_table(table_name):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        try:
            cursor = db.cursor()
            sql = 'create table if not exists ' + table_name + '(id int(10) unsigned auto_increment primary key, create_name varchar(100) not null, create_time varchar(100) not null, update_name varchar(100) not null, update_time varchar(100) not null)'
            cursor.execute(sql)
        except:
            db.close()
            return 0

        db.close()
        return 1


# 删除数据表
def drop_table(table_name):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        try:
            cursor = db.cursor()
            sql = 'drop table if exists ' + table_name
            cursor.execute(sql)
        except:
            db.close()
            return 0

        db.close()
        return 1

# 获取权限
def get_power(username, password, table_name, action):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        try:
            str_where = 'username="' + username + '" and password="' + password + '"'
            sql = 'select username,roleId from user_list where ' + str_where
            cursor = db.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql)
            result = cursor.fetchall()
            if len(result) > 0:
                power_id = result[0]['roleId']
                str_where = 'power_id=' + str(power_id) + ' and db_name="' + table_name + '"' + ' and function_en="' + action + '"'
                sql = 'select power_id,db_name,function_en from power_list where ' + str_where
                cursor.execute(sql)
                result2 = cursor.fetchall()
            else:
                return 0
        except:
            db.close()
            return 0

        db.close()
        # return 1
        return len(result2)

# 查询数据
def find_data(table_name, str_where, str_field, args):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        try:
            sql = 'select * from ' + table_name
            if str_where:
                sql += ' where ' + str_where
            cursor = db.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql)
            count = cursor.rowcount

        except:
            db.close()
            return 0
        field = str_field or '*'
        sql = 'select ' + field + ' from ' + table_name

        skipNum = 0
        limit = 0
        sort = ''
        if args:
            skipNum = (args['pre_page_num']) * (args['curr_page'] - 1)
            limit = args['pre_page_num']
            sort = args['sort']
        if str_where:
            sql += ' where ' + str_where
        if sort:
            sql += ' order by ' + sort
        if limit > 0:
            sql += ' limit ' + str(limit)
        if skipNum > 0:
            sql += ' offset ' + str(skipNum)

        print(sql)
        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except:
            db.close()
            return 0

        db.close()
        return {'count': count, 'rows': result}


# 插入数据
def insert_data(db_name, list_data):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        sql = 'insert into ' + db_name
        tuple_title = tuple(list_data[0].keys())
        str_title = re.sub(r'\'', '`', str(tuple_title))
        sql += str_title
        sql += ' values '
        int_num = 1
        for item in list_data:
            tuple_data = tuple(item.values())
            str_data = str(tuple_data)
            sql += str_data
            if int_num < len(list_data):
                sql += ', '
            int_num += 1

        print(sql)
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            db.close()
            return 0

        db.close()
        return 1


# 修改数据
def update_data(db_name, str_where, dict_update):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:

        sql = 'update ' + db_name
        int_num = 1
        updateStr = ''
        for key in dict_update.keys():
            if type(dict_update[key]) == int or type(dict_update[key]) == float:
                updateStr += '`' + key + '`' + '=' + str(dict_update[key])
            else:
                updateStr += '`' + key + '`' + '=\'' + dict_update[key] + '\''
            if int_num < len(dict_update):
                updateStr += ','
            int_num += 1

        sql += ' set ' + updateStr + ' where ' + str_where
        print(sql)
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            db.close()
            return 0

        db.close()
        return 1


# 删除数据
def del_data(db_name, dict_where):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        field = ''
        for key in dict_where:
            field = key
        str_data = '('
        int_num = 1
        for item in dict_where[field]:
            if type(item) == int:
                str_data += str(item)
            else:
                str_data += ('"' + item + '"')
            if int_num < len(dict_where[field]):
                str_data += ','
            int_num += 1
        str_data += ')'
        sql = 'delete from ' + db_name + ' where ' + field + ' in ' + str_data
        print(sql)
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            db.close()
            return 0

        db.close()
        return 1


# 插入修改删除列
def update_col(db_name, str_data):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        sql = 'alter table `' + db_name + '` ' + str_data
        print(sql)
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            db.close()
            return 0

        db.close()
        return 1

# 操作记录
def set_record(dict_record):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        sql = 'select modelId, name, name_ch from data_list where name ="' + dict_record['dbName'] + '"'
        try:
            cursor = db.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql)
            result = cursor.fetchall()
        except:
            db.close()
            return 0

        if len(result) > 0:
            pass
        else:
            return 0

        dict_record['modelId'] = result[0]['modelId']
        dict_record['dbName_ch'] = result[0]['name_ch']

        sql = 'insert into record_list'
        tuple_title = tuple(dict_record.keys())
        str_title = re.sub(r'\'', '`', str(tuple_title))
        sql += str_title
        sql += ' values '
        tuple_data = tuple(dict_record.values())
        str_data = str(tuple_data)
        sql += str_data

        print(sql)
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            db.close()
            return 0

        db.close()
        return 1

# 获取thead
def get_head(str_where):
    db = connect_db()
    if db == 'Error':
        db.close()
        return 0
    else:
        sql = 'select * from data_list'
        if str_where:
            sql += ' where ' + str_where
        sql += ' order by modelId ASC, field_sort ASC'
        try:
            cursor = db.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql)
            result = cursor.fetchall()
        except:
            db.close()
            return 0

        if len(result) > 0:
            list_rows = []
            int_index = 0
            for key, item in enumerate(result):
                item['field_width'] = str(item['field_width'])
                item['field_sort'] = str(item['field_sort'])
                item['id'] = item['modelId']
                del item['modelId']
                if key == 0:
                    list_rows.append(item)
                    int_index = 0
                else:
                    if item['id'] == result[key - 1]['id']:
                        list_rows[int_index]['field_ch'] += (';'+item['field_ch'])
                        list_rows[int_index]['field_en'] += (';' + item['field_en'])
                        list_rows[int_index]['data_type'] += (';' + item['data_type'])
                        list_rows[int_index]['field_width'] += (';' + str(item['field_width']))
                        list_rows[int_index]['field_sort'] += (';' + str(item['field_sort']))
                    else:
                        list_rows.append(item)
                        int_index += 1
            result = list_rows
        else:
            pass

        db.close()
        return result

