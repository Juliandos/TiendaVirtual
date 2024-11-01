from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import modulo_actualizar, modulo_crear

url_modulos = f'{url_base}/modulos/'

router_modulo = APIRouter(
    prefix="/modulos",
    tags=["modulos"]
)

@router_modulo.get('/todos')
def listar_modulos():
    payload = ""
    headers = {}

    response = requests.request("GET", url_modulos, headers=headers, data=payload)
    
    return response.json()

@router_modulo.get('/uno/{id}')
def buscar_modulo_por_id(id: int):
    
    url = f'{url_modulos}/{id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_modulo.post('/crear')
def crear_modulo(modulo: modulo_crear):
        
    payload = json.dumps({
    "nombre": modulo.nombre
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_modulos, headers=headers, data=payload)
    return response.json()

@router_modulo.delete('/eliminar/{id}')
def eliminar_modulo_por_id(id: int):
    
    url = f'{url_modulos}/{id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_modulo.put('/actualizar')
def actualizar_modulo_por_id(modulo: modulo_actualizar):
    url = f'{url_modulos}/{modulo.id}'

    payload = json.dumps({
    "nombre": modulo.nombre,
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
