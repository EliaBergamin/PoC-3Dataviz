import os
import requests
from dotenv import load_dotenv
from django.http import JsonResponse
import json

def call_api(request):
    load_dotenv()
    cities = [
        {
            "id": 0,
            "name": 'Berlin',
        },
        {
            "id": 1,
            "name": 'Paris',
        },
        {
            "id": 2,
            "name": 'Rome',
        },
        {
            "id": 3,
            "name": 'Madrid',
        },
        {
            "id": 4,
            "name": 'New York',
        },
    ]

    headers = {
        'Content-Type': 'application/json'  # Se necessario
    }

    try:
        data = {
            "data": [],
            "legend" : {
                "x": "DateTime",
                "y": "Temperature",
                "z": "City"
            },
        }

        for i,q in enumerate(cities):
            api_url = f'{os.getenv('API_URL')}?access_key={os.getenv('API_KEY')}&query={q}'
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  # Lancia un'eccezione per codici di stato HTTP non 2xx
            cj = response.json()
            tosave = {
                "id": i,
                "labelX": q["name"],
                "value": cj["current"]["temperature"],
                "labelZ":cj["location"]["localtime"]
            }
            data["data"].append(tosave)
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)