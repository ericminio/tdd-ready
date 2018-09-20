from flask import Flask
from flask import render_template, make_response, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/hello')
def hello():
    return make_response(jsonify(
        {
            'message': 'Hello world'
        }
    ))
