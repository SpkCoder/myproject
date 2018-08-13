# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse
import os

def hello(request):
    # context = {}
    # context['hello'] = 'Hello World!'
    # return render(request, 'hello.html', context)

    file_path = os.path.join(os.path.dirname(__file__), 'static\\index.html')
    with open(file_path, encoding='utf-8') as file:
        data = file.read()
        return HttpResponse(data)


