from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import servicio_rol_actualizar, servicio_rol_crear

url_servicios_tipo = f'{url_base}/servicio_tipos/'

router_tipo_servicio = APIRouter(
    prefix="/servicio_tipos",
    tags=["servicio_tipos"]
)

@router_tipo_servicio.get('/todos')
def listar_servicios_tipo():
    payload = ""
    headers = {}

    response = requests.request("GET", url_servicios_tipo, headers=headers, data=payload)
    
    return response.json()

@router_tipo_servicio.get('/uno/{servicio_tipo_id}')
def buscar_servicio_tipo_por_id(servicio_tipo_id: int):
    
    url = f'{url_servicios_tipo}/{servicio_tipo_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_tipo_servicio.post('/crear')
def crear_servicio_tipo(s_t: servicio_rol_crear):
        
    payload = json.dumps({
    "nombre": s_t.nombre
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_servicios_tipo, headers=headers, data=payload)
    return response.json()

@router_tipo_servicio.delete('/eliminar/{servicio_tipo_id}')
def eliminar_servicio_tipo_por_id(servicio_tipo_id: int):
    
    url = f'{url_servicios_tipo}/{servicio_tipo_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_tipo_servicio.put('/actualizar')
def actualizar_servicio_tipo_por_id(s_t: servicio_rol_actualizar):
    url = f'{url_servicios_tipo}/{s_t.id}'

    payload = json.dumps({
    "nombre": s_t.nombre
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
