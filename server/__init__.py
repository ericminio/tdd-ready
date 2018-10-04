from flask import Flask
from flask import make_response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def hello():
    return make_response(jsonify(
        {
            'message': 'Hello Vue'
        }
    ))
