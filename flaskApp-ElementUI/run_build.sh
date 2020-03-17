#!/bin/bash
#更改工作目录
cd /media/xian/Work/myproject/flaskApp-ElementUI/flaskApp/static/vue-cli-admin

echo "npm run build"
nohup npm run build  > ./nohup_build.log 2>&1 &