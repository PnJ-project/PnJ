from flask import Flask, request, jsonify
from include.model.hanspell import check
from include.model.transform_date import use_dateutil, not_dateutil, is_koreandate, trans_korean, remove_korean_date_words
from konlpy.tag import Okt
from dateutil.parser import parse
from include.model.stt_test.stt_test1 import main
from flask_cors import CORS

import re

app = Flask(__name__)
stream = None

CORS(app, resources={r"/*": {"origins": "*"}})

PREFIX = "/trans"

# 년, 월, 일
def dateutil_parse():
    parsed_date = parse('230901')
    formatted_date = parsed_date.strftime('%Y-%m-%dT%H:%M:%S')
    return formatted_date


# dateutil로 가능한지 아닌지 체크
def check_dateutil(sentence):
    date_patterns = [
        r'\d{4}/\d{2}/\d{2}',
        r'\d{4}\.\d{2}\.\d{2}',
        r'\d{4}-\d{2}-\d{2}'
    ]

    for pattern in date_patterns:
        matches = re.findall(pattern, sentence)
        if matches:
            return matches
    return 0


@app.route(PREFIX + '/date', methods=['POST'])
def transform_date():
    result = []
    text = request.form['input']
    lines = text.split('\n')
    sentences = []
    for line in lines:
        line = line.strip()  # 양 끝의 공백을 제거합니다.
        if not line:  # 공백인 경우 넘어갑니다.
            continue
        hanspell_sent = check(line)
        sentences.append(hanspell_sent)

    for sentence in sentences:
        noun = ""
        date = ""
        time = ""
        okt = Okt()
        pos_result = okt.pos(sentence.checked)
        for word in pos_result:
            if word[1] == 'Number' and ('시' in word[0] or '분' in word[0] or '초' in word[0]) :
                time += word[0]
            elif word[1] == 'Number' or word[1] == 'Punctuation'or word[0] == '부터':
                date += word[0]
            elif word[1] == 'Noun' or word[1] == 'Alpha':
                noun += word[0]

        # dateutil라이브러리 사용할 수 있는 형태인지 확인
        dateutil_list = check_dateutil(sentence.checked)
        # dateutil 사용할 수 있으면
        if dateutil_list:
            start_time, end_time = use_dateutil(sentence, dateutil_list)
            result.append({
                "start": {
                    "dateTime": start_time,
                    "timeZone": "Asia/Seoul"
                },
                "end": {
                    "dateTime": end_time,
                    "timeZone": "Asia/Seoul"
                },
                "summary": noun
            })


        #dateutil 형식 외
        else:
            start_time, end_time = not_dateutil(sentence, pos_result)
            result.append({
                "start": {
                    "dateTime": start_time,
                    "timeZone": "Asia/Seoul"
                },
                "end": {
                    "dateTime": end_time,
                    "timeZone": "Asia/Seoul"
                },
                "summary": noun
            })

    return jsonify(result)



@app.route(PREFIX + '/test', methods=['GET'])
def hello_world():  # put application's code here
    print('Hello Console!')
    return 'Hello World!'

@app.route(PREFIX + '/test/stt', methods=['POST'])
def stt():
    result = main()  # main 호출
    return result, 200

if __name__ == '__main__':
    app.run()
