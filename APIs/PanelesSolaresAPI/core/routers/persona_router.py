from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import persona_actualizar, persona_crear

url_personas = f'{url_base}/personas/'

router_persona = APIRouter(
    prefix="/personas",
    tags=["personas"]
)

@router_persona.get('/todas')
def listar_personas():
    payload = ""
    headers = {}

    response = requests.request("GET", url_personas, headers=headers, data=payload)
    
    return response.json()

@router_persona.get('/una/{persona_email}')
def buscar_persona_por_id(persona_email: str):
    
    url = f'{url_personas}/{persona_email}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_persona.get('/login')
def login(username):
    
    url = f'{url_personas}/login'
    data = {'email': username}

    response = requests.request('POST', url, headers={}, json=data)# averiguar bien porque json y data hacen diferencia en este tipo de request
    
    return response.json()

@router_persona.post('/crear')
def crear_persona(persona: persona_crear):
    
    print(persona)

    payload = json.dumps({
        "nombre": persona.nombre,
        "telefono": persona.telefono,
        "email": persona.email,
        "contrasena": persona.contrasena,
        "salario": persona.salario,
        "direccion": persona.direccion,
        "token": persona.token,
        "status": persona.status
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_personas, headers=headers, data=payload)
    return response.json()

@router_persona.delete('/eliminar/{persona_id}')
def eliminar_persona_por_id(persona_id: int):
    
    url = f'{url_personas}/{persona_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_persona.put('/actualizar')
def actualizar_persona_por_id(persona: persona_actualizar):
    url = f'{url_personas}/{persona.id}'

    payload = json.dumps({
        "nombre": persona.nombre,
        "telefono": persona.telefono,
        "email": persona.email,
        "contrasena": persona.contrasena,
        "salario": persona.salario,
        "direccion": persona.direccion,
        "token": persona.token,
        "status": persona.status
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
