from fastapi import APIRouter, Request
import requests
import json

from assets.util import url_base

from core.models.todos_model import rol_permiso__actualizar, rol_permiso__crear

url_rol_permisos = f'{url_base}/rol_permisos/'

router_rol_permiso = APIRouter(
    prefix="/rol_permisos",
    tags=["rol_permisos"]
)

@router_rol_permiso.get('/todos')
def listar_rol_permisos():
    payload = ""
    headers = {}

    response = requests.request("GET", url_rol_permisos, headers=headers, data=payload)
    
    return response.json()

@router_rol_permiso.get('/uno/{rol_id}/{permiso_id}')
def buscar_rol_permiso_por_id(rol_id: int, permiso_id: int):
    
    url = f'{url_rol_permisos}/{rol_id}/{permiso_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_rol_permiso.post('/crear')
def crear_rol_permiso(r_p: rol_permiso__crear):
        
    payload = json.dumps({
        "rol_id": r_p.rol_id,
        "permisos_id": r_p.permiso_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_rol_permisos, headers=headers, data=payload)
    return response.json()

@router_rol_permiso.delete('/eliminar/{rol_id}/{permiso_id}')
def eliminar_rol_permiso_por_id(rol_id: int, permiso_id: int):
    
    url = f'{url_rol_permisos}/{rol_id}/{permiso_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_rol_permiso.put('/actualizar')
def actualizar_rol_permiso_por_id(r_p: rol_permiso__actualizar):
    url = f'{url_rol_permisos}/{r_p.rol_id}/{r_p.permiso_id}'

    payload = json.dumps({
    "rol_id": r_p.nuevo_rol_id,
    "permisos_id": r_p.nuevo_permiso_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()

@router_rol_permiso.post('/modulo')
async def obtener_permisos_por_modulo(request: Request):
    url = f'{url_rol_permisos}modulo'
    
    datos_json = json.dumps(await request.json())

    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, data=datos_json)

    return response.json()