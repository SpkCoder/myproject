#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from flaskApp import app
from flaskApp.modules import my_bs4
from multiprocessing import Process
if __name__ == '__main__':
    # run my_bs4
    p = Process(target=my_bs4.main)
    p.start()
    # run app
    app.run(host='0.0.0.0', port=8000)