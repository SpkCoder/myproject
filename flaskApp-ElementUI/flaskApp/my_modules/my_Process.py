# -*- coding: utf-8 -*-
from multiprocessing import Process, Pool, cpu_count, Queue
import os, time, random
import requests

# 子进程要执行的代码
# def run_proc(name):
#     time.sleep(random.random() * 3)
#     print('Run child process %s (%s)...' % (name, os.getpid()))
#     return 'over'


# if __name__=='__main__':
#     print('Parent process %s.' % os.getpid())
#     p = Process(target=run_proc, args=('test',))
#     print('Child process will start.')
#     p.start()
#     p.join()
#     print('Child process end.')



# 进程池
def long_time_task(name):
    print('Run task %s (%s)...' % (name, os.getpid()))
    start = time.time()
    time.sleep(1)
    # time.sleep(random.random() * 3)
    # data = {'params': ''}
    # res = requests.get('http://127.0.0.1:4000/api/python/user_list', params=data)
    # print(res.text)
    end = time.time()
    print('Task %s runs %0.2f seconds.' % (name, (end - start)))
    return name

if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    list_res = []
    p = Pool(cpu_count())
    for i in range(5):
        res = p.apply_async(long_time_task, args=(i,))
        list_res.append(res)
    print('Waiting for all subprocesses done...')
    for res in list_res:
        print(res.get())
    # p.close()
    # p.join()
    print('All subprocesses done.')



#写进程
# def write(q):
#     for i in range(3):
#          q.put(i)
#          print("put {0} to queue".format(i))
#读进程
# def read(q):
#     while True:
#         result = q.get()
#         time.sleep(1)
#         print("get {0} from queue".format(result))


# if __name__ == "__main__":
#     # 父进程创建Queue，并传给各个子进程：
#     q = Queue()
#     # 启动子进程pw，写入:
#     pw = Process(target=write,args=(q,))
#     pw.start()
#     # 启动子进程pr，读入:
#     pr = Process(target=read,args=(q,))
#     pr.start()
#     # 等待pw结束:
#     # pw.join()
#     # pr进程里是死循环，无法等待其结束，只能强行终止:
#     # pr.terminate()

