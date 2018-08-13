# -*- coding: utf-8 -*-

from django.conf.urls import url
from . import views
from . import tests

urlpatterns = [
    url(r'^$', views.hello),
    url(r'^test$', tests.testdb),
]
