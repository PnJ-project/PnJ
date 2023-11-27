import requests
from pprint import pprint

# Define the URL
url = "https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-schedule"

# Set up the parameters for the request
params = {
    "stitch_env": "prod",
    "sortTemplate": "5",
    "sportId": "1",  # Assuming you want to send a single sportId, as the URL has duplicates
    "startDate": "2024-02-28",
    "endDate": "2024-03-01",
    "gameType": ["E", "S", "R", "F", "D", "L", "W", "A"],
    "language": "en",
    "leagueId": ["104", "103", "160"],
    "contextTeamId": "",  # No value provided in the URL
}

response = requests.get(url, params=params)
pprint(response.json())