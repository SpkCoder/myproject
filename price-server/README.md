## start server
docker run --name price-server -p 8000:8000 -v $PWD/price-server:/home/app -w /home/app -d python-env-docker /home/app/run.sh

