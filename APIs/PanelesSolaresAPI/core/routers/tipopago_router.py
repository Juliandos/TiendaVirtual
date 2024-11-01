from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import tipo_pago_actualizar, tipo_pago_crear

url_tipos_pago = f'{url_base}/tipo_pagos/'

router_tipo_pago = APIRouter(
    prefix="/tipo_pagos",
    tags=["tipo_pagos"]
)

@router_tipo_pago.get('/todos')
def listar_tipos_pago():
    payload = ""
    headers = {}

    response = requests.request("GET", url_tipos_pago, headers=headers, data=payload)
    
    return response.json()

@router_tipo_pago.get('/uno/{tipo_pago_id}')
def buscar_tipo_pago_por_id(tipo_pago_id: int):
    
    url = f'{url_tipos_pago}/{tipo_pago_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_tipo_pago.post('/crear')
def crear_tipo_pago(t_p: tipo_pago_crear):
        
    payload = json.dumps({
    "nombre": t_p.nombre,
    "status": t_p.status
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_tipos_pago, headers=headers, data=payload)
    return response.json()

@router_tipo_pago.delete('/eliminar/{tipo_pago_id}')
def eliminar_tipo_pago_por_id(tipo_pago_id: int):
    
    url = f'{url_tipos_pago}/{tipo_pago_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_tipo_pago.put('/actualizar')
def actualizar_tipo_pago_por_id(t_p: tipo_pago_actualizar):
    url = f'{url_tipos_pago}/{t_p.id}'

    payload = json.dumps({
    "nombre": t_p.nombre,
    "status": t_p.status
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json
