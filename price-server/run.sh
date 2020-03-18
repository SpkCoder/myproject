#!/bin/bash

echo "============ start ============"
#启动runserver.py
cd /home/app
PROCESS="python3 ./runserver.py"
LOGDIR="../nohup_runserver.log"
ID=`ps -aux|grep "$PROCESS" | grep -v "grep" | awk '{print $2}'`
if [ -n "$ID" ];then
    echo "process $PROCESS already exist PID $ID"
else
    nohup $PROCESS  > $LOGDIR 2>&1 &
    echo "process $PROCESS start"
fi

#启动爬虫
cd /home/app
PROCESS="python3 ./runbs4.py"
LOGDIR="../nohup_runbs4.log"
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
