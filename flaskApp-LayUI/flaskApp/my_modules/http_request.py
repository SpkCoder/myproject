# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import requests
import sys

# req = requests.get(url='https://www.biqukan.com/1_1094/5403177.html')
# str_html = req.text
#
# soup = BeautifulSoup(str_html, 'html.parser', from_encoding='utf-8')
# soup = soup.prettify()
# soup = BeautifulSoup(soup, 'html.parser', from_encoding='utf-8')
# print(soup.select("h1")[0].text)
# print("=======================")
# print(soup.select("#content")[0].text)


class downloader(object):
    def __init__(self):
        self.server = 'http://www.biqukan.com'
        self.target = 'http://www.biqukan.com/1_1094/'
        self.names = []  # 存放章节名
        self.urls = []  # 存放章节链接

    def get_download_url(self):
        req = requests.get(url=self.target)
        str_html = req.text
        soup = BeautifulSoup(str_html, 'html.parser')
        soup = soup.prettify()
        soup = BeautifulSoup(soup, 'html.parser')
        list_a = soup.select(".listmain a")[15:]
        # print(list_a)
        for item in list_a:
            self.names.append(item.string.replace("\n", "").strip())
            self.urls.append(self.server + item.get('href'))
        # print(self.names)
        # print(self.urls)

    def get_contents(self, target_url):
        req = requests.get(url=target_url)
        str_html = req.text
        soup = BeautifulSoup(str_html, 'html.parser')
        soup = soup.prettify()
        soup = BeautifulSoup(soup, 'html.parser')
        text = soup.select("#content")[0].text
        # print(text)
        return text

    def writer(self, name, path, text):
        with open(path, 'a', encoding='utf-8') as f:
            f.write(name + '\n')
            f.writelines(text)
            f.write('\n')


if __name__ == "__main__":
    dl = downloader()
    dl.get_download_url()
    print('《一年永恒》开始下载：')
    for i in range(len(dl.urls)):
        dl.writer(dl.names[i], '一念永恒.txt', dl.get_contents(dl.urls[i]))
        num = (i + 1) / len(dl.urls) * 100
        sys.stdout.write(format(num, '.2f') + '%' + '\n')
        sys.stdout.flush()
    print('《一年永恒》下载完成')



