from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import Imagen_actualizar,Imagen_crear

url_imagenes = f'{url_base}/imagenes/'

router_imagen = APIRouter(
    prefix="/imagenes",
    tags=["imagenes"]
)

@router_imagen.get('/todas')
def listar_imagenes():
    payload = ""
    headers = {}

    response = requests.request("GET", url_imagenes, headers=headers, data=payload)
    
    return response.json()

@router_imagen.get('/una/{imagen_id}')
def buscar_imagen_por_id(imagen_id: int):
    
    url = f'{url_imagenes}/{imagen_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_imagen.post('/crear')
def subir_imagen(imagen: Imagen_crear):
        
    payload = json.dumps({
        "nombre": imagen.nombre,
        "url": imagen.url,
        "producto_id": imagen.producto_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_imagenes, headers=headers, data=payload)
    
    return response.json()

@router_imagen.delete('/eliminar/{imagen_id}')
def eliminar_imagen_por_id(imagen_id: int):
    
    url = f'{url_imagenes}/{imagen_id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_imagen.put('/actualizar')
def actualizar_imagen_por_id(imagen: Imagen_actualizar):
        
    url_imagen = f'{url_imagenes}/{imagen.id}'
    
    payload = json.dumps({
    "nombre": imagen.nombre,
    "url": imagen.url,
    "producto_id": imagen.producto_id
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url_imagen, headers=headers, data=payload)
    return response.json()