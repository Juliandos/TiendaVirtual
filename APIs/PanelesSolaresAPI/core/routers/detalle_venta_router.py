from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import Detalle_venta_actualizar, Detalle_venta_crear

url_detalles_venta = f'{url_base}/detalle_ventas/'

router_detalle_venta = APIRouter(
    prefix="/detalle_ventas",
    tags=["detalle_ventas"]
)

@router_detalle_venta.get('/todos')
def listar_detalles_venta():
    payload = ""
    headers = {}

    response = requests.request("GET", url_detalles_venta, headers=headers, data=payload)
    
    return response.json()

@router_detalle_venta.get('/uno/{servicio_venta_id}')
def buscar_detalle_venta_por_id(servicio_venta_id: int, producto_id:int):
    
    url = f'{url_detalles_venta}/{servicio_venta_id}/{producto_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_detalle_venta.post('/crear')
def crear_detalle_venta(D_V: Detalle_venta_crear):
        
    payload = json.dumps({
    "servicio_venta_id": D_V.servicio_venta_id,
    "producto_id": D_V.producto_id,
    "cantidad": D_V.cantidad
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_detalles_venta, headers=headers, data=payload)
    return response.json()

@router_detalle_venta.delete('/eliminar/{servicio_venta_id}/{producto_id}')
def eliminar_detalle_venta_por_id(servicio_venta_id: int, producto_id: int):
    
    url = f'{url_detalles_venta}/{servicio_venta_id}/{producto_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_detalle_venta.put('/actualizar/{servicio_venta_id}/{producto_id}')
def actualizar_detalle_venta_por_id(D_V: Detalle_venta_actualizar):
    url = f'{url_detalles_venta}/{D_V.servicio_venta_id}/{D_V.producto_id}'

    payload = json.dumps({
    "cantidad": D_V.cantidad
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
