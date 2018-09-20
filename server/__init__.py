from flask import Flask
from flask import render_template, make_response, jsonify
import os
import psycopg2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/hello')
def hello():
    database = os.environ['PGDATABASE']
    user = os.environ['PGUSER']
    password = os.environ['PGPASSWORD']
    with psycopg2.connect(host='localhost',dbname=database, user=user, password=password) as connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute('SELECT content FROM message;')
                (content, ) = cursor.fetchone()
            except Exception, e:
                print e
                raise e

            return make_response(jsonify(
                {
                    'message': content
                }
            ))
