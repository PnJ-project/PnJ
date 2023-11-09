import requests
import json
from pprint import pprint
url = 'https://www.koreabaseball.com/ws/Schedule.asmx/GetScheduleList'
data = {
    'leId': '1',
    'srIdList': '3,4,5,7',
    'seasonId': '2021',
    'gameMonth': '11',
    'teamId':'',
}
headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
res = requests.post(url, data=data, headers=headers)
pprint(res.json())