docker run --name nodeApp-LayUI -p 3000:3000 -v $PWD/nodeApp-LayUI:/home -w /home -d node:8.14.0 /home/run.sh

 Node.js Application (Expresss Framework) using mongodb
================================ 

### Install an app

npm install

### Run an app

npm install pm2 -g

pm2 start server.json

pm2 list

pm2 logs layui
