from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import producto_categoria_actualizar, producto_categoria_crear

url_producto_categorias = f'{url_base}/producto_categorias/'

router_producto_categoria = APIRouter(
    prefix="/producto_categorias",
    tags=["producto_categorias"]
)

@router_producto_categoria.get('/todos')
def listar_producto_categorias():
    payload = ""
    headers = {}

    response = requests.request("GET", url_producto_categorias, headers=headers, data=payload)
    
    return response.json()

@router_producto_categoria.get('/uno/{producto_id}/{categoria_id}')
def buscar_producto_categoria_por_id(producto_id: int, categoria_id: int):
    
    url = f'{url_producto_categorias}/{producto_id}/{categoria_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_producto_categoria.post('/crear')
def crear_producto_categoria(producto: producto_categoria_crear):
        
    payload = json.dumps({
        "producto_id": producto.producto_id,
        "categoria_id": producto.categoria_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_producto_categorias, headers=headers, data=payload)
    return response.json()

# @router_producto_categoria.delete('/eliminar/{categoria_id}/{producto_id}')
# def eliminar_producto_categoria_por_id(producto_id: int, categoria_id: int):
    
#     url = f'{url_producto_categorias}/{categoria_id}/{producto_id}'

#     payload = {}
#     headers = {}

#     response = requests.request("DELETE", url, headers=headers, data=payload)
#     return response.json()

@router_producto_categoria.delete('/eliminar/{categoria_id}/{producto_id}')
def eliminar_detalle_venta_por_id(categoria_id: int, producto_id: int):
    
    url = f'{url_producto_categorias}/{categoria_id}/{producto_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_producto_categoria.put('/actualizar/{categoria_id}/{producto_id}')
def actualizar_producto_categoria_por_id(producto: producto_categoria_actualizar):
    url = f'{url_producto_categorias}/{producto.producto_id}/{producto.categoria_id}'

    payload = json.dumps({
    "producto_id": producto.producto_id,
    "categoria_id": producto.categoria_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
