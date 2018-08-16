from flaskApp import app
from datetime import timedelta

app.config['ENV'] = 'development'
# app.config['ENV'] = 'production'

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)

if app.config['ENV'] == 'development':
    app.config['DEBUG'] = True
    app.config['dbArgs'] = {'host': 'localhost', 'user': 'root', 'password': '', 'port': '3306', 'database': 'mydb'}
else:
    app.config['DEBUG'] = False
    app.config['dbArgs'] = {'host': 'localhost', 'user': 'root', 'password': '', 'port': '3306', 'database': 'mydb'}
