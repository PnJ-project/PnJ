import json
import csv

class Sports_Parser():
    super_category_dict = {
        'kbaseball'  : '국내야구',
        'wbaseball'  : '해외야구',
        'kfootball'  : '국내축구',
        'wfootball'  : '해외축구',
        'basketball' : '농구',
        'volleyball' : '배구',
    }

    def __init__(self, path="", keys=[], categories=[], exclude=[], mode='individual'):
        self.dir_path = path
        self.keys = keys
        self.categories = categories
        self.exclude = exclude
        self.mode = mode

    def dump_individual(self):
        for category in self.categories:
            json_file_path = self.dir_path + 'json/' + category + '.json'
            csv_file_path  = self.dir_path + 'csv/' + category + '.csv'

            with open(json_file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)

            with open(csv_file_path, 'w', newline='', encoding='utf-8') as file:
                writer = csv.DictWriter(file, fieldnames=keys)
                writer.writeheader()
                for item in data:
                    if any(ex in item.get("categoryName") for ex in self.exclude):
                        continue
                    row = {key: item.get(key, None) for key in keys}
                    writer.writerow(row)

    def dump_all(self):
        csv_file_path  = self.dir_path + 'csv/collection.csv'
        with open(csv_file_path, 'w', newline='', encoding='utf-8-sig') as file:
            writer = csv.DictWriter(file, fieldnames=keys)
            writer.writeheader()
            for category in self.categories:
                json_file_path = self.dir_path + 'json/' + category + '.json'
                with open(json_file_path, 'r', encoding='utf-8') as file:
                    data = json.load(file)

                for item in data:
                    if any(ex in item.get("categoryName") for ex in self.exclude):
                        continue
                    
                    if not item.get("homeTeamName", None) or not item.get("awayTeamName", None):
                        continue

                    row = {key: item.get(key, None) for key in keys}
                    row["category"] = "스포츠"
                    row["category_name"] = self.super_category_dict[category]
                    row["title"] = row["categoryName"]
                    row["info"] = row["awayTeamName"] + ", " + row["homeTeamName"]
                    writer.writerow(row)

    def json_to_csv(self):
        if self.mode == 'individual':
            self.dump_individual()
        elif self.mode == 'collection':
            self.dump_all()

if __name__ == '__main__':
    directory_root = './'
    keys = [
        "gameId",
        "superCategoryId",
        "categoryName",
        "gameDate",
        "gameDateTime",
        "homeTeamName",
        "homeTeamScore",
        "awayTeamName",
        "awayTeamScore",
        "winner",
        "statusCode",
        "statusInfo",
        "cancel",
        "suspended",
        "reversedHomeAway",
        "homeTeamEmblemUrl",
        "awayTeamEmblemUrl",
        "title",
        "info",
        "category",
        "category_name",
        ]
    categories = ["kbaseball", "wbaseball", "kfootball", "wfootball", "basketball","volleyball"]
    exclude = ["기타"]
    mode = 'individual'
    parser = Sports_Parser(directory_root, keys, categories, exclude, mode)
    parser.json_to_csv()