
from datetime import datetime, timedelta
from dateutil.parser import parse
import re

# 오늘, 내일, 모레 날짜 변환
def parse_weekday(text):
    weekdays = {
        '월요일': 0,
        '화요일': 1,
        '수요일': 2,
        '목요일': 3,
        '금요일': 4,
        '토요일': 5,
        '일요일': 6
    }
    for weekday, value in weekdays.items():
        if weekday in text:
            return value
    return None


def get_korean_date(text):
    today = datetime.now()
    weekday = parse_weekday(text) # 요일
    if '다다음 주' in text:
        week_offset = 2
    elif '다음 주' in text:
        week_offset = 1
    elif '이번 주' in text:
        week_offset = 0

    if weekday is not None and week_offset is not None:
        days_until_target = weekday - today.weekday()
        days_until_target += 7 * (week_offset )  # 주간 오프셋 수정
        korean_date = today + timedelta(days=days_until_target)
        return korean_date
    elif '오늘' in text:
        return datetime.now()
    elif '내일' in text:
        return datetime.now() + timedelta(days=1)
    elif '모레' in text:
        return datetime.now() + timedelta(days=2)
    elif '글피' in text:
        return datetime.now() + timedelta(days=3)
    else:
        return None




def is_special_symbol(text):
    if '/' in text or '-' in text or '.' in text:
        return 1
    else:
        return 0

def date_combined(data_list):
    results = []
    current_result = {}
    for data in data_list:
        for key, value in data.items():
            if value is not None:
                if key in current_result:
                    current_result[key].append(value)
                else:
                    current_result[key] = [value]
        if 'year' in current_result and 'month' in current_result and 'day' in current_result:
            results.append(current_result.copy())
            current_result.clear()

    if current_result:
        results.append(current_result)

    for result in results:
        for key, value in result.items():
            if isinstance(value, list):
                result[key] = ' '.join(value)





def check_date_time_format(input_string):
    input_string_without_space = input_string.replace(" ", "")
    pattern = r'(\d{1,4}년)?(\d{1,2}월)?(\d{1,2}일|일)?(\d{1,2}시)?(\d{1,2}분)?(\d{1,2}초)?'
    matches = re.search(pattern, input_string_without_space)
    if matches:
        year, month, day, hour, minute, second = matches.groups()
        return {
            "year": year,
            "month": month,
            "day": day,
            "hour": hour,
            "minute": minute,
            "second": second
        }
    else:
        return None



# '/' 날짜를 년,월,일로 변환
def convert_date_format(date_string, num):
    if num == 1:
        parts = date_string.split('/')
    elif num == 2:
        parts = date_string.split('-')
    elif num == 3:
        parts = date_string.split('.')

    if len(parts) > 2:
        year = parts[0]
        month = str(int(parts[1])).zfill(2)
        day = parts[2]
    elif len(parts) == 2:
        year = None
        month = str(int(parts[0])).zfill(2)
        day = parts[1]

    if year and month and day:
        return f'{year}년 {month}월 {day}일'
    elif month and day:
        return f'{month}월 {day}일'
    else:
        return f'{day}일'


def convert_ko_month(date_string):
    month = date_string
    for data in date_string:
        if data:
            month = str(int(data)).zfill(2)
    return f'{month}월'


def change_datetime(checked):
    current_time = datetime.now()
    checked['year'] = current_time.year if checked['year'] is None else checked['year']
    checked['month'] = current_time.month if checked['month'] is None else int(checked['month'][:-1])
    checked['day'] = current_time.day if checked['day'] is None else int(checked['day'][:-1])
    checked['hour'] = current_time.hour if checked['hour'] is None else checked['hour']
    checked['minute'] = current_time.minute if checked['minute'] is None else checked['minute']
    checked['second'] = current_time.second if checked['second'] is None else checked['second']

    # datetime 객체로 변환
    date_time = datetime(
        year=checked['year'],
        month=checked['month'],
        day=checked['day'],
        hour=checked['hour'],
        minute=checked['minute'],
        second=checked['second']
    )
    return date_time



def is_serial(text):
    if '부터' in text or '~' in text:
        return 1
    else:
        return 0


# dateutil사용할 수 있는지 확인
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


def trans_korean(sentence):
    # 연속인지 확인

    # 별개의 일정

    # 하나의 일정
    start_time_str = get_korean_date(sentence).strftime('%Y-%m-%dT%H:%M:%S')
    start_time = datetime.fromisoformat(start_time_str)
    end_time = start_time + timedelta(hours=1)
    return start_time, end_time


def is_koreandate(sentence):
    korean_date_list = ['다다음 주', '다음 주', '이번 주', '오늘', '내일', '모레', '글피']
    for date in korean_date_list:
        # 한글 날짜 데이터가 있니?
        if date in sentence:
            return 1
    else:
        return 0


def remove_korean_date_words(input_string):
    specific_words = [
        '다다음 주', '다음 주', '이번 주',
        '오늘', '내일', '모레',
        '글피', '월요일', '화요일',
        '수요일', '목요일', '금요일',
        '토요일', '일요일'
    ]

    for word in specific_words:
        input_string = re.sub(r'\b{}\b'.format(re.escape(word)), '', input_string)

    return input_string


def use_dateutil(sentence, dateutil_list):
    date_list = []
    for date_info in dateutil_list:
        parsed_date = parse(date_info)
        formatted_date = parsed_date.strftime('%Y-%m-%dT%H:%M:%S')
        date_list.append(formatted_date)
    if len(date_list) > 1:

        # 연속된 일정이라면
        if is_serial(sentence.checked):
            start_time = datetime.fromisoformat(min(date_list))
            end_time = datetime.fromisoformat(max(date_list))
            return start_time, end_time

        # 별개의 일정이면?
        else:
            for i in range(len(date_list)):
                start_time = datetime.fromisoformat(date_list[i])
                end_time = start_time + timedelta(hours=1)
                return start_time, end_time
    # 하나의 일정
    else:
        start_time = datetime.fromisoformat(date_list.pop())
        end_time = start_time + timedelta(hours=1)
        return start_time, end_time


def not_dateutil(sentence, pos_result):
    # 연속된 일정이라면?
    if is_serial(sentence.checked):
        start_end = []
        number_list = []
        for word in pos_result:
            if word[1] == 'Number':
                number_list.append(word[0])
        for number in number_list:
            temp_word = number
            if '/' in number:
                temp_word = convert_date_format(number, 1)
            elif '-' in number:
                temp_word = convert_date_format(number, 2)
            elif '.' in number:
                temp_word = convert_date_format(number, 3)

            checked = check_date_time_format(temp_word)
            new_datetime = change_datetime(checked)
            start_end.append(str(new_datetime))

        start_time = datetime.fromisoformat(min(start_end))
        end_time = datetime.fromisoformat(max(start_end))
        return start_time, end_time


    # sentence가 dateutil 형식 외, 연속되지 않은 일정이라면?
    else:
        korean_info = ""
        number_list = []
        new_datetime = datetime.now()
        for word in pos_result:
            if word[1] == 'Number':
                convert_word = word[0]
                number_list.append(word[0])
        if number_list:
            for number in number_list:
                if '/' in number:
                    convert_word = convert_date_format(number, 1)

                elif '-' in number:
                    convert_word = convert_date_format(number, 2)

                elif '.' in number:
                    convert_word = convert_date_format(number, 3)
                elif '년' in number:
                    korean_info += number
                elif '월' in number:
                    korean_info += " " + number
                elif '일' in number:
                    korean_info += " " + number
            if korean_info:
                # convert_ko_month(korean_info)
                ko_checked = check_date_time_format(korean_info)
                new_datetime = change_datetime(ko_checked)
                start_time = new_datetime.strftime("%Y-%m-%dT%H:%M:%S")
                end_time = (new_datetime + timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M:%S")
                return start_time, end_time
                # 년 / 월 / 일 / 분 / 초 처리

            else:
                checked = check_date_time_format(convert_word)
                new_datetime = change_datetime(checked)
                start_time = new_datetime.strftime("%Y-%m-%dT%H:%M:%S")
                end_time = (new_datetime + timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M:%S")
                return start_time, end_time

        else:  # 날짜 정보가 없는 것
            start_time = None
            end_time = None
            return start_time, end_time
