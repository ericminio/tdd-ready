from flask import jsonify, make_response

def pong():
    return make_response(jsonify(
        {'alive': True}
    ))