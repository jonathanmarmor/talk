#! /usr/bin/env python

from flask import Flask, render_template

from config import CONF


app = Flask(__name__)
app.secret_key = CONF.SECRET_KEY


@app.route('/')
def index():
    return render_template(
        'index.html',
    )


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=CONF.DEBUG
    )
