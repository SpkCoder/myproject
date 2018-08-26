# -*- coding: utf-8 -*-

import json


# http://localhost:8000/python/HttpTest?action=findData&searchJson={"name":"mick"}&sortJson={"id":1}&fieldJson={"name":1}&prePageNum=10&currPage=1  //查询数据
# http://localhost:8000/python/HttpTest?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据
# http://localhost:8000/python/HttpTest?action=updateData&searchJson={"name":"mick"}&updateJson={"age":20}  //修改数据
#http://localhost:3000/python/http_test?action=delData&whereJson={"id":[1,3,5]}  //删除数据


def operation(req):
    print(req.method)
    return 'fileList'


