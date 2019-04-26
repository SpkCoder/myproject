# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import random


class mypillow(object):
    def __init__(self):
        self.names = '' 

    #缩放图像
    def zoom_image(self,path,pathTo,w2,h2):
        # 打开一个图像
        im = Image.open(path)
        # 获得图像尺寸:
        w, h = im.size
        # print('Original image size: %sx%s' % (w, h))
        if h2:
            #以高缩放
            im.thumbnail((h2/h*w, h2))
        else:
            #以宽缩放
            im.thumbnail((w2, w2/w*h))
        im.save(pathTo)

    #裁剪图像
    def crop_image(self,path,pathTo,x1,y1,x2,y2):
        im = Image.open(path)
        im2 = im.crop((x1, y1, x2, y2))
        im2.save(pathTo)

    #模糊滤镜
    def blur_image(self,path,pathTo):
        im = Image.open(path)
        im2 = im.filter(ImageFilter.BLUR)
        im2.save(pathTo)

    #生成验证码
    def code_image(self,pathTo):
        # 随机字母:
        def rndChar():
            # print(random.randint(65, 90))  #产生 65 到 90 的一个整数型随机数
            return chr(random.randint(65, 90))

        # 随机颜色1:
        def rndColor():
            return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))

        # 随机颜色2:
        def rndColor2():
            return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))

        width = 240
        height = 60
        im = Image.new('RGB', (width, height), (255, 255, 255))
        # 创建Font对象:
        font = ImageFont.truetype('./Arial.ttf', 36)
        # 创建Draw对象:
        draw = ImageDraw.Draw(im)
        # 填充每个像素:
        for x in range(width):
            for y in range(height):
                draw.point((x, y), fill=rndColor())
        # 输出文字:
        for t in range(4):
            draw.text((60 * t + 10, 10), rndChar(), font=font, fill=rndColor2())
        # 模糊:
        im = im.filter(ImageFilter.BLUR)
        im.save(pathTo)


if __name__ == "__main__":
    mypillow = mypillow()
    # mypillow.zoom_image('mytest.jpg','mytest2.jpg',200,0)
    # mypillow.crop_image('mytest.jpg','mytest2.jpg',0,0,100,150)
    # mypillow.blur_image('mytest.jpg','mytest2.jpg')
    # mypillow.code_image('mytest2.jpg')



