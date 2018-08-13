from flaskApp import app

app.config['ENV'] = 'development'
# app.config['ENV'] = 'production'

if app.config['ENV'] == 'development':
    app.config['DEBUG'] = True
    app.config['dbArgs'] = {'host': 'localhost', 'user': 'root', 'password': '', 'port': '3306', 'database': 'mydb'}

else:
    app.config['DEBUG'] = False
    app.config['dbArgs'] = {'host': 'localhost', 'user': 'root', 'password': '', 'port': '3306', 'database': 'mydb'}
