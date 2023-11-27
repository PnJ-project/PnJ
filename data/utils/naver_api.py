import json
import requests
from datetime import date
from dateutil.relativedelta import relativedelta

MONTH_DEVIATION = 6
CATEGORY_LIST = ['kbaseball', 'wbaseball', 'kfootball', 'wfootball', 'basketball', 'volleyball']
# FIELDS = {
#             'kbaseball'  : 'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,homeStarterName,awayStarterName,winPitcherName,losePitcherName,homeCurrentPitcherName,awayCurrentPitcherName,broadChannel',
#             'wbaseball'  : 'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,homeStarterName,awayStarterName,winPitcherName,losePitcherName,homeCurrentPitcherName,awayCurrentPitcherName,broadChannel',
#             'kfootball'  : 'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,matchRound,roundTournamentInfo,phaseCode,groupName,leg,hasPtSore,homePtScore,awayPtScore,league,leagueName,aggregateWinner,neutralGround',
#             'wfootball'  : 'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,matchRound,roundTournamentInfo,phaseCode,groupName,leg,hasPtSore,homePtScore,awayPtScore,league,leagueName,aggregateWinner,neutralGround',
#             'basketball' : 'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,conference',
#             'volleyball' : 'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,round,groupName'
#         }
FIELDS = {
            'kbaseball'  : 'basic,superCategoryId,categoryName',
            'wbaseball'  : 'basic,superCategoryId,categoryName',
            'kfootball'  : 'basic,superCategoryId,categoryName',
            'wfootball'  : 'basic,superCategoryId,categoryName',
            'basketball' : 'basic,superCategoryId,categoryName',
            'volleyball' : 'basic,superCategoryId,categoryName'
        }
SUPER_CATEGORY = ['basketball', 'volleyball']


class Naver_Sports_Schedule():
    def get_param(self, category, schedule_deviation):
        fields = FIELDS.get(category, '')
        start_date = date.today()
        end_date = start_date + relativedelta(months=+schedule_deviation)
        if category in SUPER_CATEGORY:
            params = {
                'fields' : fields,
                'superCategoryId' : category,
                'fromDate': start_date.strftime('%Y-%m-%d'),
                'toDate':end_date.strftime('%Y-%m-%d'),
                'size': '500'
            }
        else:
            params = {
                'fields' : fields,
                'upperCategoryId' : category,
                'fromDate': start_date.strftime('%Y-%m-%d'),
                'toDate' : end_date.strftime('%Y-%m-%d'),
                'size' : '500'
            }
        return params

    def cleanse_data(self, data):

        return data

    def sport_schedule(self, category_lst = CATEGORY_LIST, month_deviation = MONTH_DEVIATION):
        url = 'https://api-gw.sports.naver.com/schedule/games'
        for category in category_lst:
            params = self.get_param(category, month_deviation)
            response = requests.get(url, params=params)
            json_data = response.json()
            json_data = json_data['result']['games']
            cleansed_data = self.cleanse_data(json_data)
            with open(f'./json/{category}.json', 'w', encoding='utf-8') as json_file:
                json_file.write(json.dumps(cleansed_data, ensure_ascii=False, indent=4))

if __name__ == '__main__':
    crawler = Naver_Sports_Schedule()
    crawler.sport_schedule() # crawler.sport_schedule(category=['wbaseball', 'kfootball', ...], month_deviation=2)

