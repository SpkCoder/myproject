# -*- coding:utf-8 -*-
from my_logging import logger
from threading import Timer

def main():
    Timer(0.01, main).start()
    global index
    index += 1
    print(str(index) + ' This is debug message')
    logger.debug(str(index) + ' This is debug message')

if __name__ == '__main__':
    index = 0
    main()


