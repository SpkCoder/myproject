# -*- coding:utf-8 -*-
import logging
from logging import handlers

def logger():
    log_debug = False
    log_path = './logs/out.log'
    level = 'DEBUG'
    dict_level = {
        'DEBUG':logging.DEBUG,
        'INFO':logging.INFO,
        'WARNING':logging.WARNING,
        'ERROR':logging.ERROR,
        'CRITICAL':logging.CRITICAL
    }
    logger = logging.getLogger(log_path)
    logger.setLevel(dict_level[level])
    formatter = logging.Formatter('%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s')
    if log_debug:
        # 控制台输出
        Sthandler = logging.StreamHandler()
        Sthandler.setFormatter(formatter)
        logger.addHandler(Sthandler)
    else:
        # when按时间分割日志 S/秒、M/分、H/小时、D/天、W/每星期、midnight/每天凌晨
        Tthandler = handlers.TimedRotatingFileHandler(filename=log_path,when='D',backupCount=3,encoding='utf-8')
        Tthandler.setFormatter(formatter)
        logger.addHandler(Tthandler)
    return logger

logger = logger()
# logger.debug('This is debug message')
# logger.info('This is info message')
# logger.warning('This is warning message')
# logger.error('This is error message')

