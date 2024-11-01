from fastapi import APIRouter
import requests
# import datetime
import json

from assets.util import url_base
from core.models.todos_model import Rol, Rol_crear, Rol_actualizar
from core.util.utilidades import remover_nones, convertir_datetime_a_str, serializar_datetime


url_roles = f'{url_base}/roles/'

router_rol = APIRouter(
    prefix="/roles",
    tags=["roles"]
)

@router_rol.get('/todos')
def listar_roles():
    payload = ""
    headers = {}

    response = requests.request("GET", url_roles, headers=headers, data=payload)
    
    return response.json()

@router_rol.get('/uno/{rol_id}')
def buscar_rol_por_id(Rol: int):
    
    url = f'{url_roles}/{rol_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_rol.post('/crear')
def crear_rol(Rol: Rol_crear):
    
    payload = json.dumps({
        "nombre": Rol.nombre,
        "descripcion": Rol.descripcion,
        "status": Rol.status
    })

    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_roles, headers=headers, data=payload)
    return response.json()
    # return "klsjg"

@router_rol.delete('/eliminar/{rol_id}')
def eliminar_rol_por_id(rol_id: int):
    
    url = f'{url_roles}/{rol_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_rol.put('/actualizar')
def actualizar_rol_por_id(rol: Rol_actualizar):
    url = f'{url_roles}/{rol.id}'

    payload = json.dumps({
        "nombre": rol.nombre,
        "descripcion": rol.descripcion,
        "status": rol.status
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
