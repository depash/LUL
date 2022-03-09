from urllib import response
from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import null
from app.models import User
import os
import requests

stats_routes = Blueprint('stats', __name__)


@stats_routes.route('/', methods=['POST'])
@login_required
def getting_stats():
    data = request.json
    key = os.environ.get('API_KEY')
    region = data['region']
    name = data['name']
    url = f'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{name}'
    user = requests.get(url,
                        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 OPR/84.0.4316.21",
                                 "Accept-Language": "en-US,en;q=0.9",
                                 "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                                 "Origin": "https://developer.riotgames.com",
                                 "X-Riot-Token": key})
    if user.status_code != 200:
        return {'errors': 'error message'}, 401
    else:
        region_2 = None
        if region == 'NA1' or region == 'LA2' or region == 'LA1' or region == 'BR1' or region == 'OC1':
            region_2 = 'americas'
        if region == 'EUN1' or region == 'EUW1':
            region_2 = 'europe'
        if region == 'RU' or region == 'TR1' or region == 'JP1' or region == 'KR':
            region_2 = 'asia'
        formated_user = user.json()
        puuid = formated_user['puuid']
        url = f'https://{region_2}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=normal&start=0&count=10'
        all_matches = requests.get(url,
                                   headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 OPR/84.0.4316.21",
                                            "Accept-Language": "en-US,en;q=0.9",
                                            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                                            "Origin": "https://developer.riotgames.com",
                                            "X-Riot-Token": key})
        formated_all_matches = all_matches.json()

        return {'user': formated_user, 'matches': formated_all_matches}
