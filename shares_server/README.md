docker run --name shares_server -p 8001:8001 -v $PWD/shares_server:/home/app -w /home/app -d python-env-docker /home/app/run.sh

pip install uwsgi

## start uwsgi
uwsgi --ini ./uwsgi.ini

## stop uwsgi
uwsgi --stop ./uwsgi.pid

## reload uwsgi
uwsgi --reload ./uwsgi.pid

## start nginx
vi /etc/nginx/conf.d/default.conf

server {
	listen       8001;
	server_name  localhost;

	location / {
	include uwsgi_params;
	uwsgi_pass 127.0.0.1:5111;
	}
}

nginx -s reload

