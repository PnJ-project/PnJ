from flask import Flask, request, jsonify
from flask_cors import CORS
from include.model.transform_date import transform_date
from include.model.recommend import calcultation_similarity
from include.dataloader.dataloader import save_item_similarity


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'  # CORS 헤더 설정
stream = None

CORS(app)

PREFIX = "/trans"


# 일정 등록
@app.route(PREFIX + '/date', methods=['POST'])
def trans_date():
    print("들어옴")
    text = request.form['input']
    date = transform_date(text)
    return jsonify(date)


# 컨텐츠 추천
@app.route(PREFIX + '/recom', methods=['POST'])
def get_recommend():
    summary_list = []
    summary_list.append(request.form['input'])
    result = calcultation_similarity(summary_list)
    return result


# 아이템간 유사도
@app.route(PREFIX + '/recom', methods=['GET'])
def save_df_similarity():
    save_item_similarity()
    return "ok"


@app.route(PREFIX +'/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
