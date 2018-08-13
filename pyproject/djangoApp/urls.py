# -*- coding: utf-8 -*-

from django.conf.urls import url
from . import views
from . import HttpTest
from django.views.generic.base import RedirectView


urlpatterns = [
    url(r'^$', views.hello),
    url(r'^favicon.ico$', RedirectView.as_view(url=r'static/favicon.ico')),
    url(r'^python/HttpTest/$', HttpTest.operation),
]
