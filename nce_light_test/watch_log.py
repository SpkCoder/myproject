# -*- coding:utf-8 -*-

from multiprocessing import Process, Pool, cpu_count
import db_mysql
import time
import os
import shutil

class model():
    def __init__(self):
        self.list_city = ['杭州市','宁波市','温州市']
        self.list_log_dir = ['./logs/光功率日志', './logs/光距日志']
        self.dict_create_log = {}
        self.list_write_over_log = []
        self.int_log_split = 1000
        self.init()
        self.mysqldb = db_mysql.model()

    def init(self):
        # 初始化已经读取过的文件夹
        for log_dir in self.list_log_dir:
            log_readed_dir = os.path.join(log_dir, 'readed')
            if not os.path.exists(log_readed_dir):
                os.mkdir(log_readed_dir)

    def p_work(self, log_path, all_lines, tuple_index, list_lines):
        print(log_path, str(all_lines), str(tuple_index))
        list_data = []
        if log_path.find('光功率日志') != -1:
            table_name = 'light_power_list'
            for line in list_lines:
                list_msg = line.strip().split('@#')
                password = list_msg[14]
                # print(password)
                #password 唯一 主键
                if len(list_msg)==21 and password != '' and list_msg[1] in self.list_city:
                    dict_obj = {
                        'time': list_msg[0].replace('/', '-'),
                        'city': list_msg[1],
                        'city_area': list_msg[2],
                        'olt_produce': list_msg[5],
                        'olt_ip': list_msg[6],
                        'olt_name': list_msg[7][:100],
                        'pon_name': list_msg[8][:100],
                        'sn_name': list_msg[9],
                        'ont_id': list_msg[11],
                        'ont_name': list_msg[12],
                        'password': list_msg[14],
                        'account': list_msg[15],
                        'run_time': int(list_msg[16]),
                        'cpu_rate': int(list_msg[17]),
                        'ram_rate': int(list_msg[18]),
                        'power_send': round(float(list_msg[19]), 2),
                        'power_receive': round(float(list_msg[20]), 2),
                    }
                    list_data.append(dict_obj)
        elif log_path.find('光距日志') != -1:
            table_name = 'light_distance_list'
            for line in list_lines:
                list_msg = line.strip().split('@#')
                password = list_msg[4]
                # print(password)
                #password 唯一 主键
                if len(list_msg)==8 and password != '':
                    dict_obj = {
                        'time': list_msg[1].replace('/', '-'),
                        'password': list_msg[4],
                        'distance': int(list_msg[7]),
                    }
                    list_data.append(dict_obj)
        else:
            table_name = ''

        if len(list_data) > 0:
            #批量插入数据库
            try:
                # 插入数据库
                self.mysqldb.insert_data(table_name, list_data)
                del list_lines
            except Exception as e:
                print(log_path+ str(tuple_index) + str(e))
        if tuple_index[1] == all_lines:
            # 移动已经读取过的日志
            readed_dir = os.path.join(os.path.split(log_path)[0], 'readed', os.path.split(log_path)[1])
            print(readed_dir)
            shutil.move(log_path, readed_dir)

    def run(self):
        # 如果日志文件不存在了，就清空缓存
        for key in list(self.dict_create_log.keys()):
            if not os.path.exists(key):
                del self.dict_create_log[key]
                if key in self.list_write_over_log:
                    self.list_write_over_log.remove(key)
        # print(self.dict_create_log)
        for log_dir in self.list_log_dir:
            list_log = [x for x in os.listdir(log_dir) if os.path.splitext(x)[1]=='.csv']
            for log_name in list_log:
                log_path = os.path.join(log_dir, log_name)
                log_size = os.path.getsize(log_path)
                if log_path not in self.dict_create_log:
                    #该文件第一次创建
                    self.dict_create_log[log_path] = log_size
                else:
                    if log_size == self.dict_create_log[log_path]:
                        #该文件已经写入完成
                        if log_path not in self.list_write_over_log:
                            self.list_write_over_log.append(log_path)
                    else:
                        #该文件没有写入完成
                        self.dict_create_log[log_path] = log_size
        # print(self.list_write_over_log)
        for log_path in self.list_write_over_log:
            with open(log_path, "r") as f:
                list_lines = f.readlines()
                #删除第一行title
                del list_lines[0]
                int_lines = len(list_lines)
                if int_lines > 0:
                    start_time = time.time()
                    list_step = list(range(0, int_lines, self.int_log_split))
                    list_step.append(int_lines - list_step[-1])
                    # print(list_step)
                    p = Pool(cpu_count())
                    for index, item in enumerate(list_step):
                        if index > 0:
                            if index == len(list_step)-1:
                                tuple_index = (list_step[index-1], list_step[index-1]+list_step[index])
                            else:
                                tuple_index = (list_step[index-1], list_step[index])
                            p.apply_async(self.p_work, args=(log_path, int_lines, tuple_index, list_lines[tuple_index[0] : tuple_index[1]]))
                    p.close()
                    p.join()
                    del list_lines
                    print('speed: ' + str(1/((time.time() - start_time)/int_lines)))

if __name__ == '__main__':

    print('watch_log start')
    mymodel = model()
    while True:
        try:
            mymodel.run()
        except Exception as e:
            print('run error: ' + str(e))
        time.sleep(1)
    print('watch_log end')

