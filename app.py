#! /usr/bin/env python

from datetime import datetime

from flask import Flask, render_template, make_response

from config import CONF


app = Flask(__name__)
app.secret_key = CONF.SECRET_KEY


@app.route('/')
def index():
    template = render_template(
        'index.html',
        _=datetime.now().isoformat(),
    )
    response = make_response(template)
    response.cache_control.max_age = 300
    return response


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=CONF.DEBUG
    )
