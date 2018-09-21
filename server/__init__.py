from flask import Flask
from flask import render_template, make_response, jsonify
from sql.postgres import Postgres
from migrate_database import MigrateDatabase

MigrateDatabase().now()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/hello')
def hello():
    try:
        (content, ) = Postgres().selectFirst('SELECT content FROM message;')
    except Exception, e:
        print e
        raise e

    return make_response(jsonify(
        {
            'message': content
        }
    ))
