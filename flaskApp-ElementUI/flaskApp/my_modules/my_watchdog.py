# -*- coding: utf-8 -*-
from watchdog.observers import Observer
from watchdog.events import *
import time

class FileEventHandler(FileSystemEventHandler):
    def __init__(self):
        FileSystemEventHandler.__init__(self)
        self.dict_num = {}

    def print_line(self, file_path):
        with open(file_path, 'r') as f:
            list_line = f.readlines()
            len_line = len(list_line)
            file_name = file_path[file_path.rindex('/')+1:]
            if file_name not in self.dict_num:
                self.dict_num[file_name] = 0
            if len_line < self.dict_num[file_name]:
                self.dict_num[file_name] = len_line
            count = 0
            for line in list_line[self.dict_num[file_name]:]:
                count=count+1
                print(line.strip())
            self.dict_num[file_name] = self.dict_num[file_name]+count
            del list_line
            # print(self.dict_num)

    def on_moved(self, event):
        if event.is_directory:
            print('directory moved from {0} to {1}'.format(event.src_path,event.dest_path))
        else:
            print('file moved from {0} to {1}'.format(event.src_path,event.dest_path))

    def on_created(self, event):
        if event.is_directory:
            print('directory created:{0}'.format(event.src_path))
        else:
            print('file created:{0}'.format(event.src_path))

    def on_deleted(self, event):
        if event.is_directory:
            print('directory deleted:{0}'.format(event.src_path))
        else:
            print('file deleted:{0}'.format(event.src_path))

    def on_modified(self, event):
        if event.is_directory:
            print('directory modified:{0}'.format(event.src_path))
        else:
            # print('file modified:{0}'.format(event.src_path))
            self.print_line(event.src_path)

if __name__ == '__main__':
    observer = Observer()
    event_handler = FileEventHandler()
    observer.schedule(event_handler,'/media/xian/Work/myproject-suqueen/ott-dns-info-docker/volumes/src/logs',True)
    observer.start()
    print('watchdog start')
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()