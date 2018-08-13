# -*- coding: utf-8 -*-

from django.http import HttpResponse
from . import models
import json


# http://localhost:8000/python/HttpTest?action=findData&searchJson={"name":"mick"}&sortJson={"id":1}&fieldJson={"name":1}&prePageNum=10&currPage=1  //查询数据
# http://localhost:8000/python/HttpTest?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据
# http://localhost:8000/python/HttpTest?action=updateData&searchJson={"name":"mick"}&updateJson={"age":20}  //修改数据
# http://localhost:8000/python/HttpTest?action=delData&dataJson={"id":1}  //删除数据


def operation(req):
    db_name = req.path.split('/')[2]
    db_model = getattr(models, db_name)

    # 查询数据
    def find_data():
        if 'searchJson' in req.GET:
            try:
                dict_search = json.loads(req.GET['searchJson'])
            except:
                return HttpResponse('searchJson错误')
        else:
            dict_search = {}

        if 'sortJson' in req.GET:
            try:
                dict_sort = json.loads(req.GET['sortJson'])
                tuple_sort = ()
                for k in dict_sort:
                    if dict_sort[k] == 1:
                        tuple_sort += (k,)
                    else:
                        tuple_sort += ('-' + k,)
            except:
                return HttpResponse('sortJson错误')
        else:
            tuple_sort = ()

        if 'fieldJson' in req.GET:
            try:
                dict_field = json.loads(req.GET['fieldJson'])
                tuple_field = ()
                for k in dict_field:
                    tuple_field += (k,)
            except:
                return HttpResponse('fieldJson错误')
        else:
            tuple_field = ()

        pre_page_num = 10
        curr_page = 0
        start_num = 0
        end_num = 10
        if 'prePageNum' in req.GET and 'currPage' in req.GET:
            pre_page_num = int(req.GET['prePageNum'])
            curr_page = int(req.GET['currPage'])
            start_num = pre_page_num * (curr_page - 1)
            end_num = pre_page_num * curr_page
        else:
            pass

        count = db_model.objects.all().count()
        queryset = db_model.objects.filter(**dict_search).order_by(*tuple_sort)[start_num:end_num].values(*tuple_field)
        list_rows = []
        for item in queryset:
            list_rows.append(item)
        dict_json = {'code': 0, 'msg': '', 'count': count, 'prePageNum': pre_page_num, 'currPage': curr_page,
                     'name_ch': '', 'name': '', 'field_ch': '', 'field_en': '', 'data_type': '',
                     'field_width': '', 'rows': list_rows}
        # print(dict_json)
        return HttpResponse(json.dumps(dict_json))
        # action错误

    # 插入数据
    def insert_data():
        if 'dataArr' in req.POST:
            try:
                list_data = json.loads(req.POST['dataArr'])
                print(list_data)
                if len(list_data) == 0:
                    return HttpResponse('dataArr错误')
            except:
                return HttpResponse('dataArr错误')
        else:
            return HttpResponse('dataArr错误')


        try:
            for item in list_data:
                db_model(**item).save()

            return HttpResponse('操作成功')
        except:
            return HttpResponse('操作失败')

    # 修改数据
    def update_data():
        if 'searchJson' in req.POST:
            try:
                dict_search = json.loads(req.POST['searchJson'])
                if len(dict_search) == 0:
                    return HttpResponse('searchJson错误')
            except:
                return HttpResponse('searchJson错误')
        else:
            return HttpResponse('searchJson错误')

        if 'updateJson' in req.POST:
            try:
                dict_update = json.loads(req.POST['updateJson'])
                if len(dict_update) == 0:
                    return HttpResponse('updateJson错误')
            except:
                return HttpResponse('updateJson错误')
        else:
            return HttpResponse('updateJson错误')

        try:
            db_model.objects.filter(**dict_search).update(**dict_update)

            # 修改所有的列
            # Test.objects.all().update(**dict_update)

            return HttpResponse('操作成功')
        except:
            return HttpResponse('操作失败')

    # 删除数据
    def del_data():
        if 'dataJson' in req.POST:
            try:
                dict_data = json.loads(req.POST['dataJson'])
                if len(dict_data) == 0:
                    return HttpResponse('dataJson错误')
            except:
                return HttpResponse('dataJson错误')
        else:
            return HttpResponse('dataJson错误')

        try:
            db_model.objects.filter(**dict_data).delete()

            # 删除所有数据
            # Test.objects.all().delete()

            return HttpResponse('操作成功')
        except:
            return HttpResponse('操作失败')


    # GET请求
    if req.method == "GET":
        print(req.GET)
        if 'action' in req.GET and req.GET['action'] == 'findData':
            return find_data()
        else:
            return HttpResponse('action错误')

    # POST请求
    if req.method == "POST":
        print(req.POST)
        if 'action' in req.POST and req.POST['action'] == 'insertData':
            return insert_data()
        elif 'action' in req.POST and req.POST['action'] == 'updateData':
            return update_data()
        elif 'action' in req.POST and req.POST['action'] == 'delData':
            return del_data()
        else:
            return HttpResponse('action错误')


