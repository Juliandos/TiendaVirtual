from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import permisos_actualizar, permisos_crear

url_permisos = f'{url_base}/permisos/'

router_permisos = APIRouter(
    prefix="/permisos",
    tags=["permisos"]
)

@router_permisos.get('/todos')
def listar_permisos():
    payload = ""
    headers = {}

    response = requests.request("GET", url_permisos, headers=headers, data=payload)
    
    return response.json()

@router_permisos.get('/uno/{permiso_id}')
def buscar_permiso_por_id(permiso_id: int):
    
    url = f'{url_permisos}/{permiso_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_permisos.post('/crear')
def crear_permiso(permisos: permisos_crear):
        
    payload = json.dumps({
    "r": permisos.r,
    "w": permisos.w,
    "u": permisos.u,
    "d": permisos.d,
    "rol": permisos.rol,
    "modulo_id": permisos.modulo_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_permisos, headers=headers, data=payload)
    return response.json()

@router_permisos.delete('/eliminar/{permiso_id}')
def eliminar_permiso_por_id(permiso_id: int):
    
    url = f'{url_permisos}/{permiso_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_permisos.put('/actualizar')
def actualizar_permiso_por_id(permisos: permisos_actualizar):
    url = f'{url_permisos}/{permisos.id}'

    payload = json.dumps({
    "r": permisos.r,
    "w": permisos.w,
    "u": permisos.u,
    "d": permisos.d,
    "modulo_id": permisos.modulo_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
