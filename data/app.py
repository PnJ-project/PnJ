from flask import Flask, request, jsonify
from flask_cors import CORS
from include.model.transform_date import transform_date
from include.model.recommend import calcultation_similarity_classification, calcultation_similarity


app = Flask(__name__)
stream = None

CORS(app, resources={r"/*": {"origins": "*"}})

PREFIX = "/trans"


@app.route(PREFIX + '/date', methods=['POST'])
def trans_date():
    text = request.form['input']
    date = transform_date(text)
    return jsonify(date)


@app.route(PREFIX + '/recom', methods=['POST'])
def get_recommend():
    summary_list = []
    summary_list.append(request.form['input'])
    result = calcultation_similarity(summary_list)
    return result


@app.route(PREFIX + '/recom/category', methods=['POST'])
def get_recommend_class():
    summary_list = []
    summary_list.append(request.form['input'])
    result = calcultation_similarity_classification(summary_list)
    return result


@app.route(PREFIX +'/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
