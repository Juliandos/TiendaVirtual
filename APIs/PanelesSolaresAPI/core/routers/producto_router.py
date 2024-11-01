from fastapi import APIRouter, Path
import requests
import json

from assets.util import url_base

from core.models.todos_model import producto_actualizar, producto_crear

url_productos = f'{url_base}/productos/'

router_producto = APIRouter(
    prefix="/productos",
    tags=["productos"]
)

@router_producto.get('/todos')
def listar_productos():
    payload = ""
    headers = {}

    response = requests.request("GET", url_productos, headers=headers, data=payload)
    
    return response.json()

@router_producto.get('/uno/{producto_id}')
def buscar_producto_por_id(producto_id: int = Path(title="El ID debe ser un número positivo", gt=0)):
    
    url = f'{url_productos}/{producto_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_producto.post('/crear')
def crear_producto(producto: producto_crear):
    print(producto)
    payload = json.dumps({
        "nombre": producto.nombre,
        "referencia": producto.referencia,
        "descripcion": producto.descripcion,
        "marca": producto.marca,
        "cantidad_minima": producto.cantidad_minima,
        "cantidad_actual": producto.cantidad_actual,
        "precio_compra": producto.precio_compra,
        "precio_venta": producto.precio_venta
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_productos, headers=headers, data=payload)
    return response.json()

@router_producto.delete('/eliminar/{producto_id}')
def eliminar_producto_por_id(producto_id: int):
    
    url = f'{url_productos}/{producto_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_producto.put('/actualizar')
def actualizar_producto_por_id(producto: producto_actualizar):
    url = f'{url_productos}/{producto.id}'

    payload = json.dumps({
        "nombre": producto.nombre,
        "referencia": producto.referencia,
        "descripcion": producto.descripcion,
        "marca": producto.marca,
        "cantidad_minima": producto.cantidad_minima,
        "cantidad_actual": producto.cantidad_actual,
        "precio_compra": producto.precio_compra,
        "precio_venta": producto.precio_venta
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
