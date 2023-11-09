from flask import Flask, request, jsonify
from flask_cors import CORS
from include.model.transform_date import transform_date


app = Flask(__name__)
stream = None

CORS(app, resources={r"/*": {"origins": "*"}})

PREFIX = "/trans"


@app.route(PREFIX + '/date', methods=['POST'])
def trans_date():
    text = request.form['input']
    date = transform_date(text)
    return jsonify(date)


@app.route(PREFIX + '/recom', methods=['GET'])
def get_recommend():
    result = ''
    return result



@app.route('/')
def hello_world():  # put application's code here
    print('Hello Console!')
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True, port=5000)
