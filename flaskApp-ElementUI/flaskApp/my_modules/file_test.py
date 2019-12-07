# -*- coding: utf-8 -*-
import os
import shutil
import time

class model():

    def __init__(self):
        self.name = '' 

    def test(self):
        print(os.name)
        print(os.uname())
        # print(os.environ)
        print(os.environ.get('PATH'))
        print(os.path.abspath('.'))
        print(os.path.join(os.path.abspath('.'), 'testdir'))
        # os.mkdir('/media/xian/Work/docker/zdns-log/testdir')
        # os.rmdir('/media/xian/Work/docker/zdns-log/testdir')
        print(os.path.split('/media/xian/Work/docker/zdns-log/file.txt'))
        print(os.path.splitext('/media/xian/Work/docker/zdns-log/file.txt'))
        # os.rename('./file.txt', './myfile.txt')
        # os.remove('./myfile2.txt')
        # shutil.copy('./myfile.txt', './testdir')
        print(os.listdir('.'))
        print([x for x in os.listdir('.') if os.path.isdir(x)])
        print([x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py'])

    def run(self):
        int_lines = 0
        start_time = time.time()
        with open('./112.15.224.247_571_03_201912020807', 'r') as f:
            while True:
                line = f.readline()
                if line:
                    # print(line.strip())
                    int_lines += 1
                    # 190000/s
                    print(F'speed: {1/(time.time()-start_time)*int_lines}')
                else:
                    break

    def run2(self):
        int_lines = 0
        start_time = time.time()
        with open('./112.15.224.247_571_03_201912020807', 'r') as f:
            lines = f.readlines()
            int_lines = len(lines)
            # 220000/s
            print(F'speed: {1/(time.time()-start_time)*int_lines}')

    def run3(self):
        int_lines = 0
        start_time = time.time()
        f2 = open('./logs/myfile2.txt', 'w')
        with open('./myfile.txt', 'r') as f:
            while True:
                line = f.readline()
                if line:
                    f2.write(line)
                    int_lines += 1
                    # 70000/s
                    print(F'speed: {1/(time.time()-start_time)*int_lines}')
                else:
                    break
        f2.close()

    def run4(self):
        int_lines = 0
        start_time = time.time()
        f2 = open('./logs/myfile2.txt', 'w')
        with open('./myfile.txt', 'r') as f:
            lines = f.readlines()
            f2.writelines(lines)
            int_lines = len(lines)
            # 230000/s
            print(F'speed: {1/(time.time()-start_time)*int_lines}')
        f2.close()

if __name__ == "__main__":
    filetest = model()
    filetest.run3()


