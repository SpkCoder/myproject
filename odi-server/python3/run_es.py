#!/usr/bin/env python3
# -*- coding:utf-8 -*-

# from flaskApp.config.config import *
import time
import re
import sys
from threading import Timer
import logging
import json
import os


#ESDB操作
from flaskApp.controller import es_operation
from flaskApp.controller import alarm_operation

#设置UTC时区
# os.environ['TZ'] = 'UTC'
# time.tzset()

def main():

    Timer(300, main).start()
    
    t = int(time.time())

    tm = time.localtime(t)

    logging.debug ("start %s" % time.strftime('%Y-%m-%dT%H:%M:%S',tm))

    lt = t- t%300
    gt = lt - 300
    
    lt_str = time.strftime('%Y-%m-%d %H:%M:00',time.localtime(lt))
    gt_str = time.strftime('%Y-%m-%d %H:%M:00',time.localtime(gt))
    
    logging.debug(gt_str)
    logging.debug(lt_str)


    obj = es_operation.model(gt_str,lt_str)
    obj.run()

    obj = alarm_operation.model(gt_str,lt_str)
    obj.run()


    logging.debug ("end %s" % time.strftime('%Y-%m-%dT%H:%M:%S',time.localtime(int(time.time()))))


def initLog():
    logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S',
                    filename='../logs/report.log',
                    filemode='w'
                    )

if __name__ == '__main__':

    # initLog()
    print('run_es start')
    
    # 4分的时候开始执行
    t = int(time.time())
    tt = t%300
    if tt <= 240:
        time.sleep(240-tt)
    else:
        time.sleep(300-tt+240)

    main()
