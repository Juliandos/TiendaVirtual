from fastapi import APIRouter
import requests
import json
from datetime import date

from assets.util import url_base

from core.models.todos_model import Factura_actualizar, Factura_crear

url_facturas = f'{url_base}/facturas/'

router_factura = APIRouter(
    prefix="/facturas",
    tags=["facturas"]
)

@router_factura.get('/todas')
def listar_facturas():
    payload = ""
    headers = {}

    response = requests.request("GET", url_facturas, headers=headers, data=payload)
    
    return response.json()

@router_factura.get('/una/{factura_id}')
def buscar_factura_por_id(factura_id: int):
    
    url = f'{url_facturas}/{factura_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_factura.post('/crear')# no me funciona
def crear_factura(Factura: Factura_crear):
        
    payload = json.dumps({
        "nombre": Factura.nombre,
        "fecha_ejecucion": Factura.fecha_ejecucion,
        "fecha_finalizacion": Factura.fecha_finalizacion,
        "servicio_tipo_id": Factura.servicio_tipo_id,
        "detalles": Factura.detalles,
        "referencia_cobro": Factura.referencia_cobro,
        "direccion": Factura.direccion,
        "status": Factura.status,
        "tipo_pago_id": Factura.tipo_pago_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_facturas, headers=headers, data=payload)
    return response.json()

@router_factura.delete('/eliminar/{factura_id}')
def eliminar_factura_por_id(factura_id: int):
    
    url = f'{url_facturas}/{factura_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_factura.put('/actualizar')
def actualizar_factura_por_id(Factura: Factura_actualizar):
    url = f'{url_facturas}/{Factura.id}'

    payload = json.dumps({
        "nombre": Factura.nombre,
        "fecha_ejecucion": Factura.fecha_ejecucion,
        "fecha_finalizacion": Factura.fecha_finalizacion,
        "servicio_tipo_id": Factura.servicio_tipo_id,
        "detalles": Factura.detalles,
        "referencia_cobro": Factura.referencia_cobro,
        "direccion": Factura.direccion,
        "status": Factura.status,
        "tipo_pago_id": Factura.tipo_pago_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
