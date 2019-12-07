# -*- coding:utf-8 -*-
import os
import logging
from logging import handlers


class logger():
    def __init__(self, log_type='print', log_path='./out.log', log_level='DEBUG'):
        self.__log_type = log_type   #print/time/size
        self.__log_path = log_path
        self.__log_level = log_level
        dict_level = {
            'DEBUG':logging.DEBUG,
            'INFO':logging.INFO,
            'WARNING':logging.WARNING,
            'ERROR':logging.ERROR,
            'CRITICAL':logging.CRITICAL
        }
        log_dir = os.path.split(log_path)[0]
        if not os.path.exists(log_dir):
            os.mkdir(log_dir)
        formatter = logging.Formatter('%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s', '%Y-%m-%d %H:%M:%S')
        logger = logging.getLogger(self.__log_path)
        logger.setLevel(dict_level[self.__log_level])
        if self.__log_type == 'time':
            # when按时间分割日志 S/秒、M/分、H/小时、D/天、W/每星期、midnight/每天凌晨
            Tthandler = handlers.TimedRotatingFileHandler(filename=self.__log_path,when='D',interval=1,backupCount=3,encoding='utf-8')
            Tthandler.setFormatter(formatter)
            logger.addHandler(Tthandler)
        elif self.__log_type == 'size':
            # 每隔 100M 划分一个日志文件，备份文件为 3 个
            Fthandler = handlers.RotatingFileHandler(filename=self.__log_path, mode="w", maxBytes=1024*1024*100, backupCount=3, encoding="utf-8")
            Fthandler.setFormatter(formatter)
            logger.addHandler(Fthandler)
        else:
            # 控制台输出
            Sthandler = logging.StreamHandler()
            Sthandler.setFormatter(formatter)
            logger.addHandler(Sthandler)
        self.logger = logger

    def init(self):
        return self.logger


if __name__ == "__main__":
    logger = logger(log_type='time', 
                    log_path='./logs/out.log', 
                    log_level='DEBUG'
                    ).init()
    # logger.debug('This is debug message')
    # logger.info('This is info message')
    # logger.warning('This is warning message')
    # logger.error('This is error message')
