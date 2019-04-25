# -*- coding: utf-8 -*-
from PIL import Image
from PIL import Image, ImageFilter
import os


class mypillow(object):
    def __init__(self):
        self.names = '' 

    def zoom_image(self,path,ratio):
        # 打开一个图像
        im = Image.open(path)
        # 获得图像尺寸:
        w, h = im.size
        # print('Original image size: %sx%s' % (w, h))
        im.thumbnail((w*ratio, h*ratio))
        # 把缩放后的图像用type格式保存
        im.save(path)


if __name__ == "__main__":
    mypillow = mypillow()
    mypillow.zoom_image('mytest.jpg',0.3)



