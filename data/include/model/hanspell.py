
from collections import namedtuple
import requests
import json
import time
import sys
from collections import OrderedDict
import xml.etree.ElementTree as ET


base_url = 'https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy'


class CheckResult:
    PASSED = 0
    WRONG_SPELLING = 1
    WRONG_SPACING = 2
    AMBIGUOUS = 3
    STATISTICAL_CORRECTION = 4


_checked = namedtuple('Checked',
                      ['result', 'original', 'checked', 'errors', 'words', 'time'])


class Checked(_checked):
    def __new__(cls, result=False, original='', checked='', errors=0, words=[], time=0.0):
        return super(Checked, cls).__new__(
            cls, result, original, checked, errors, words, time)

    def as_dict(self):
        d = {
            'result': self.result,
            'original': self.original,
            'checked': self.checked,
            'errors': self.errors,
            'words': self.words,
            'time': self.time,
        }
        return d

    def only_checked(self):
        return self.checked


_agent = requests.Session()
PY3 = sys.version_info[0] == 3


def _remove_tags(text):
    text = u'<content>{}</content>'.format(text).replace('<br>', '')
    if not PY3:
        text = text.encode('utf-8')

    result = ''.join(ET.fromstring(text).itertext())

    return result


def check(text):
    if isinstance(text, list):
        result = []
        for item in text:
            checked = check(item)
            result.append(checked)
        return result
    # 300 자로 수정함
    if len(text) > 300:
        return Checked(result=False)

    # passportkey, callback 직접 가져옴
    payload = {
        'passportKey': '70cc5d6f2eeaa659bfc96031934832953a71b812',
        '_callback': 'jQuery112408112611407615089_1700626703808',
        'q': text,
        'color_blindness': '0'}

    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
        'referer': 'https://search.naver.com/',
    }

    start_time = time.time()
    r = _agent.get(base_url, params=payload, headers=headers)
    passed_time = time.time() - start_time
    r = r.text
    json_str = r[r.find('{'): -2]
    json_data = json.loads(json_str)
    data = json_data['message']['result']['html']
    result = {
        'result': True,
        'original': text,
        'checked': _remove_tags(data),
        'errors': json_data['message']['result']['errata_count'],
        'time': passed_time,
        'words': OrderedDict(),
    }

    data = data.replace('<em class=\'green_text\'>', '<green>') \
        .replace('<em class=\'red_text\'>', '<red>') \
        .replace('<em class=\'violet_text\'>', '<violet>') \
        .replace('<em class=\'blue_text\'>', '<blue>') \
        .replace('</em>', '<end>')
    items = data.split(' ')
    words = []
    tmp = ''
    for word in items:
        if tmp == '' and word[:1] == '<':
            pos = word.find('>') + 1
            tmp = word[:pos]
        elif tmp != '':
            word = u'{}{}'.format(tmp, word)

        if word[-5:] == '<end>':
            word = word.replace('<end>', '')
            tmp = ''

        words.append(word)

    for word in words:
        check_result = CheckResult.PASSED
        if word[:5] == '<red>':
            check_result = CheckResult.WRONG_SPELLING
            word = word.replace('<red>', '')
        elif word[:7] == '<green>':
            check_result = CheckResult.WRONG_SPACING
            word = word.replace('<green>', '')
        elif word[:8] == '<violet>':
            check_result = CheckResult.AMBIGUOUS
            word = word.replace('<violet>', '')
        elif word[:6] == '<blue>':
            check_result = CheckResult.STATISTICAL_CORRECTION
            word = word.replace('<blue>', '')
        result['words'][word] = check_result

    result = Checked(**result)

    return result
