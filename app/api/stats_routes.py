from crypt import methods
from email.utils import formatdate
from sqlite3 import Timestamp
from urllib import response
from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import null
from app.models import User
import os
import requests
from datetime import date
from datetime import timedelta
from datetime import datetime
from riotwatcher import LolWatcher, ApiError

session = requests.Session()
stats_routes = Blueprint('stats', __name__)


@stats_routes.route('/', methods=['POST'])
@login_required
def getting_user():
    data = request.json
    key = os.environ.get('API_KEY')
    region = data['region']
    name = data['name']
    url = f'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{name}'
    user_raw = session.get(url,
                           headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 OPR/84.0.4316.21",
                                    "Accept-Language": "en-US,en;q=0.9",
                                    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                                    "Origin": "https://developer.riotgames.com",
                                    "X-Riot-Token": key})
    if user_raw.status_code != 200:
        return {'errors': 'error message'}, 401
    else:
        user = user_raw.json()
    return user


@stats_routes.route('/matches', methods=['POST'])
@login_required
def getting_stats():
    data = request.json
    key = os.environ.get('API_KEY')
    watcher = LolWatcher(key)
    name = data['name']
    region = data['region']
    url = f'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{name}'
    user_raw = session.get(url,
                           headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 OPR/84.0.4316.21",
                                    "Accept-Language": "en-US,en;q=0.9",
                                    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                                    "Origin": "https://developer.riotgames.com",
                                    "X-Riot-Token": key})
    if user_raw.status_code != 200:
        return {'errors': 'error message'}, 401
    else:
        region_2 = None
        if region == 'NA1' or region == 'LA2' or region == 'LA1' or region == 'BR1' or region == 'OC1':
            region_2 = 'americas'
        if region == 'EUN1' or region == 'EUW1':
            region_2 = 'europe'
        if region == 'RU' or region == 'TR1' or region == 'JP1' or region == 'KR':
            region_2 = 'asia'
        formated_user = user_raw.json()
        puuid = formated_user['puuid']
        url = f'https://{region_2}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10'
        all_matches_raw = session.get(url,
                                      headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 OPR/84.0.4316.21",
                                               "Accept-Language": "en-US,en;q=0.9",
                                               "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                                               "Origin": "https://developer.riotgames.com",
                                               "X-Riot-Token": key})
        formated_all_matches = all_matches_raw.json()
        match_data = []
        for match in formated_all_matches:
            url = f'https://{region_2}.api.riotgames.com/lol/match/v5/matches/{match}'
            matche_data_raw = session.get(url,
                                          headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 OPR/84.0.4316.21",
                                                   "Accept-Language": "en-US,en;q=0.9",
                                                   "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                                                   "Origin": "https://developer.riotgames.com",
                                                   "X-Riot-Token": key})
            match_data_json = matche_data_raw.json()
            info = match_data_json['info']
            participants = info['participants']
            formated_time = str(timedelta(
                seconds=info['gameDuration']))
            timestamp = info['gameCreation']
            match_data.append({'gameDuration': formated_time,
                              'gameMode': info['gameMode'],
                               'gameCreaton': timestamp,
                               'participants': [{'champ': participant['championName'],
                                                 'assists': participant['assists'],
                                                 'champLevel': participant['champLevel'],
                                                 'deaths': participant['deaths'],
                                                 'kills': participant['kills'],
                                                 'win': participant['win'],
                                                 'teamId': participant['teamId'],
                                                 'totalDamageDealt': participant['totalDamageDealt'],
                                                 'item0': participant['item0'],
                                                 'item1': participant['item1'],
                                                 'item2': participant['item2'],
                                                 'item3': participant['item3'],
                                                 'item4': participant['item4'],
                                                 'item5': participant['item5'],
                                                 'item6': participant['item6'],
                                                 'profileIcon': participant['profileIcon'],
                                                 'summoner1Id': participant['summoner1Id'],
                                                 'summoner2Id': participant['summoner2Id'],
                                                 'summonerName': participant['summonerName'],
                                                 'totalMinionsKilled': participant['totalMinionsKilled']
                                                 }for participant in participants]})
            # http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
            # http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Aatrox.png

        ranked_stats = watcher.league.by_summoner(region, formated_user['id'])
        print(ranked_stats)
        return {'user': formated_user, 'matches': match_data, 'ranked_stats': ranked_stats}
