# -*- coding: utf-8 -*-
import time
import asyncio, aiohttp


async def hello():
    for i in range(5):
        time.sleep(1)
        print('Hello World:%s' % time.time())


if __name__ =='__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(hello())
    loop.close()



# tasks = []
# url = "https://www.baidu.com/{}"
# async def hello(url):
#     async with aiohttp.ClientSession() as session:
#         async with session.get(url) as response:
#             # response = await response.read()
# #           print(response)
#             time.sleep(1)
#             print('Hello World:%s' % time.time())

# def run():
#     for i in range(5):
#         task = asyncio.ensure_future(hello(url.format(i)))
#         tasks.append(task)


# if __name__ == '__main__':
#     loop = asyncio.get_event_loop()
#     run()
#     loop.run_until_complete(asyncio.wait(tasks))
