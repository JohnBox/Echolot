from django.shortcuts import render_to_response, HttpResponse, render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from configparser import ConfigParser

import json
import vk


@csrf_exempt
def index(request):
    N = 10
    if request.method == 'GET':
        context = {
            'range': range(N),
            'title': 'Echolot'
        }
        return render_to_response('index.html', context)
    elif request.method == 'POST' and request.is_ajax:
        q = request.POST['q']
        playlist = VK().api.audio.search(q=q, count=N)
        playlist = playlist['items']
        playlist = list(map(lambda m: {
            'url': m['url'].split('?')[0],
            'artist': m['artist'],
            'title': m['title'],
            'duration': m['duration']
        }, playlist))
        return JsonResponse(json.dumps(playlist), safe=False)


config = ConfigParser()
config.read('/home/gott/PycharmProjects/Echolot/Echo/setting.ini')


class VK:
    def __init__(self):
        cfg = config['VK']
        self.session = vk.AuthSession(
            app_id=cfg['appid'],
            user_login=cfg['login'],
            user_password=cfg['password'],
            scope=cfg['permission']
        )
        self.api = vk.API(self.session, v=cfg['apiv'])

    def __getattr__(self, name):
        return getattr(self.api, name)





