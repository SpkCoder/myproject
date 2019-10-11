# -*- coding: utf-8 -*-
from watchdog.observers import Observer
from watchdog.events import *
import pymysql
import time

class FileEventHandler(FileSystemEventHandler):
    DB_HOST = '127.0.0.1' #'127.0.0.1'           #数据库地址
    DB_USER_NAME = 'root'       #数据库连接用户名
    DB_PASSWORD = '123456'    #数据库密码
    DB_NAME = 'ott-dns-info'              #数据库名称
    DB_PORT = 3306                        #数据库端口号
    DB_CHARSET = 'utf8'                   #数据库编码方式

    def __init__(self):
        FileSystemEventHandler.__init__(self)
        self.dict_num = {}
        self._db = None

    # 连接数据库mysql
    def _db_connect(self):
        try:
            self._db = pymysql.connect( host = self.DB_HOST, user = self.DB_USER_NAME, password = self.DB_PASSWORD, port = self.DB_PORT, db = self.DB_NAME, charset = self.DB_CHARSET, cursorclass = pymysql.cursors.DictCursor )
        except Exception as e:
            print('连接数据库mysql: ' + str(e))
            exit()

    def read_line(self, file_path):
        with open(file_path, 'r') as f:
            list_line = f.readlines()
            len_line = len(list_line)
            file_name = file_path[file_path.rindex('/')+1:]
            if file_name not in self.dict_num:
                self.dict_num[file_name] = len_line
            if len_line < self.dict_num[file_name]:
                self.dict_num[file_name] = len_line
            count = 0
            for line in list_line[self.dict_num[file_name]:]:
                count=count+1
                str_line = line.strip()
                print(str_line)
                # sql = 'insert into log_test(`message`) values ("%s")' % (str_line)
                # self.insert_data(sql)
            self.dict_num[file_name] = self.dict_num[file_name]+count
            del list_line
            # print(self.dict_num)

    def insert_data(self, sql):
        self._db_connect()
        try:
            # print('sql: ' + sql)
            cursor = self._db.cursor()
            cursor.execute(sql)
            self._db.commit()
            self._db.close()
            del cursor
            return True
        except Exception as e:
            self._db.rollback()
            self._db.close()
            print('insert_data: ' + str(e))
            exit()

    def on_moved(self, event):
        if event.is_directory:
            print('directory moved from {0} to {1}'.format(event.src_path,event.dest_path))
        else:
            print('file moved from {0} to {1}'.format(event.src_path,event.dest_path))

    def on_created(self, event):
        if event.is_directory:
            print('directory created:{0}'.format(event.src_path))
        else:
            print('file created:{0}'.format(event.src_path))

    def on_deleted(self, event):
        if event.is_directory:
            print('directory deleted:{0}'.format(event.src_path))
        else:
            print('file deleted:{0}'.format(event.src_path))

    def on_modified(self, event):
        if event.is_directory:
            print('directory modified:{0}'.format(event.src_path))
        else:
            # print('file modified:{0}'.format(event.src_path))
            self.read_line(event.src_path)

if __name__ == '__main__':
    observer = Observer()
    event_handler = FileEventHandler()
    observer.schedule(event_handler,'./logs',True)
    observer.start()
    print('watchdog start')
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
