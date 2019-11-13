# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from threading import Timer
from flaskApp.modules import db_sqlite
import os
import time
import logging


class model():
    def __init__(self):
        self.table_name = 'price_list'
        self.mysqldb = db_sqlite.model()
        self.target = 'http://zzny.zhengzhou.gov.cn/ncpjg/index_1.jhtml'
        self.names = []  # 存放节点名
        self.urls = []  # 存放节点链接
        self.list_type = ['蔬菜', '粮食', '食用油', '肉类', '水产品', '禽蛋类']

    def get_soup(self, target_url):
        str_html = os.popen('curl '+ target_url).read()
        # print(str_html)
        soup = BeautifulSoup(str_html, 'html.parser')
        return soup

    def get_download_url(self):
        self.names = []
        self.urls = []
        soup = self.get_soup(self.target)
        list_a = soup.select('.list-line a')[0:1]
        for item in list_a:
            self.names.append(item.string.replace('\n', '').strip())
            self.urls.append(item.get('href'))
        self.names.reverse()
        self.urls.reverse()
        # print(self.names)
        # print(self.urls)

    def get_contents(self, target_url):
        self.list_data = []
        soup = self.get_soup(target_url)
        str_time = soup.select('.sub-content .small-title')[0].text.strip().split('时间：')[1]
        list_table = soup.select('table')
        sql = 'select * from price_list where time="'+str_time+'" limit 0,1'
        result = self.mysqldb.find_data(self.table_name, {}, sql)
        if len(result['rows']) > 0:
            return self.list_data
        for index, value in enumerate(self.list_type):
            str_type = value
            list_tr = list_table[index].select('tr')[1:-1]
            for item in list_tr:
                list_td = item.select('td')
                name = list_td[0].text.strip()
                price_all = 0
                num = 0
                for td in list_td[1:]:
                    price = str(td.text.strip())
                    try:
                        price = float(price)
                    except Exception as e:
                        price = 0
                    if price > 0:
                        price_all+=price
                        num+=1
                price = round(price_all/num, 2)
                obj = {'type': str_type, 'name': name, 'price': price, 'time': str_time}
                self.list_data.append(obj)
        # print(self.list_data)
        return self.list_data

    def run(self):
        Timer(12*3600, self.run).start()
        try:
            self.get_download_url()
            for i in self.urls:
                list_data = self.get_contents(i)
                if len(list_data) > 0:
                    self.mysqldb.insert_data(self.table_name, list_data)
        except Exception as e:
            logging.error('my_bs4 run error: '+ str(e))
            

def main():
    # 18:00:00的时候开始执行
    print('mybs4 run')
    int_now = int(time.time())
    str_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int_now))
    int_time = int(time.mktime(time.strptime(str_time.split(' ')[0]+' 18:00:00', "%Y-%m-%d %H:%M:%S")))
    if int_now <= int_time:
        time.sleep(int_time-int_now)
    else:
        time.sleep(24*3600-int_now+int_time)
    mybs4 = model()
    mybs4.run()


# if __name__ == '__main__':
#     main()