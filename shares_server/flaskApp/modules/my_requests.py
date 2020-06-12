# -*- coding: utf-8 -*-
import logging
import requests
import json
import base64


class model():
    def __init__(self):
        self.name = '' 

    def get(self, **kw):
        try:
            r = requests.get(**kw, headers={'Content-Type': 'text/plain'}, timeout=5)
            res = r.content.decode(r.encoding)
            logging.debug('response json: ' + str(res))
            # res = res[1:-1]
            res = json.loads(res)
        except Exception as e:
            logging.error('requests.get error: ' + str(e))
            res = {'error': 'requests.get error'}
        return res

    def post(self, **kw):
        try:
            r = requests.post(**kw, headers={'Content-Type': 'text/plain'}, timeout=5)
            res = r.content.decode(r.encoding)
            logging.debug('response json: ' + str(res))
            res = json.loads(res)
        except Exception as e:
            logging.error('requests.post error: ' + str(e))
            res = {'error': 'requests.post error'}
        return res

    def put(self, **kw):
        try:
            self.debug(kw)
            r = requests.put(**kw, headers={'Content-Type': 'text/plain'}, timeout=5)
            res = r.content.decode(r.encoding)
            logging.debug('response json: ' + str(res))
            res = json.loads(res)
        except Exception as e:
            logging.error('requests.put error: ' + str(e))
            res = {'error': 'requests.put error'}
        return res

    def delete(self, **kw):
        try:
            r = requests.delete(**kw, headers={'Content-Type': 'text/plain'}, timeout=5)
            res = r.content.decode(r.encoding)
            logging.debug('response json: ' + str(res))
            res = json.loads(res)
        except Exception as e:
            logging.error('requests.delete error: ' + str(e))
            res = {'error': 'requests.delete error'}
        return res




if __name__ == "__main__":
    my_requests = model()


    # data = {'username':'admin','pwd':'admin'}
    # res = my_requests.get(url='http://10.0.0.171:20120/groups', json=data)
    # print(res)

    # data = {'username':'admin','pwd':'admin'}
    # res = my_requests.post(url='https://127.0.0.1:8630/19/0', json=data, verify=False)
    # print(res)