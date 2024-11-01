from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import persona_rol_actualizar, persona_rol_crear

url_persona_roles = f'{url_base}/persona_roles/'

router_persona_rol = APIRouter(
    prefix="/persona_roles",
    tags=["persona_roles"]
)

@router_persona_rol.get('/todos')
def listar_persona_roles():
    payload = ""
    headers = {}

    response = requests.request("GET", url_persona_roles, headers=headers, data=payload)
    
    return response.json()

@router_persona_rol.get('/uno/{persona_id}')
def buscar_persona_rol_por_id(persona_id: int):
    
    url = f'{url_persona_roles}/{persona_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_persona_rol.post('/crear')
def crear_persona_rol(persona: persona_rol_crear):
        
    payload = json.dumps({
        "persona_id": persona.persona_id,
        "rol_id": persona.rol_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_persona_roles, headers=headers, data=payload)
    return response.json()

@router_persona_rol.delete('/eliminar/{persona_rol_id}/{rol_id}')
def eliminar_persona_rol_por_id(persona_rol_id: int, rol_id: int):
    
    url = f'{url_persona_roles}/{persona_rol_id}/{rol_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_persona_rol.put('/actualizar')
def actualizar_persona_rol_por_id(persona: persona_rol_actualizar):
    print(persona)
    url = f'{url_persona_roles}/{persona.persona_anterior_id}/{persona.rol_anterior_id}'

    payload = json.dumps({
        "persona_id": persona.nuevo_persona_id,
        "rol_id": persona.nuevo_rol_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
