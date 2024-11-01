from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import Contacto_actualizar, Contacto_crear

url_contactos = f'{url_base}/contactos/'

router_contacto = APIRouter(
    prefix="/contactos",
    tags=["contactos"]
)

@router_contacto.get('/todos')
def listar_contactos():
    payload = ""
    headers = {}

    response = requests.request("GET", url_contactos, headers=headers, data=payload)
    
    return response.json()

@router_contacto.get('/uno/{contacto_id}')
def buscar_contacto_por_id(contacto_id: int):
    
    url = f'{url_contactos}/{contacto_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_contacto.post('/crear')
def crear_contacto(Contacto: Contacto_crear):
        
    payload = json.dumps({
    "nombre": Contacto.nombre,
    "email": Contacto.email,
    "mensaje": Contacto.mensaje
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_contactos, headers=headers, data=payload)
    return response.json()

@router_contacto.delete('/eliminar/{contacto_id}')
def eliminar_contacto_por_id(contacto_id: int):
    
    url = f'{url_contactos}/{contacto_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_contacto.put('/actualizar')
def actualizar_contacto_por_id(Contacto: Contacto_actualizar):
    print("Contacto")
    url = f'{url_contactos}/{Contacto.id}'

    payload = json.dumps({
    "nombre": Contacto.nombre,
    "email": Contacto.email,
    "mensaje": Contacto.mensaje
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
