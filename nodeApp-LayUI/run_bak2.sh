#!/bin/bash

echo "============ start ============"
#启动runserver.py
cd /home
PROCESS="pm2 start server.json"
LOGDIR="../nohup_runserver.log"
ID=`ps -aux|grep "$PROCESS" | grep -v "grep" | awk '{print $2}'`
if [ -n "$ID" ];then
    echo "process $PROCESS already exist PID $ID"
else
    nohup $PROCESS  > $LOGDIR 2>&1 &
    echo "process $PROCESS start"
fi


while true;do
 sleep 1
done
