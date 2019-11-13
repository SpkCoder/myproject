#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import logging
logging.basicConfig(level=logging.ERROR,
                format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                datefmt='%a, %d %b %Y %H:%M:%S',
                filename= './logs/bs4_out.log',
                filemode='w'
                )
from flaskApp.modules import my_bs4

if __name__ == '__main__':
    # run my_bs4
    my_bs4.main()