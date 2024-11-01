from fastapi import APIRouter
import requests
import json

from assets.util import url_base

from core.models.todos_model import publicaciones_actualizar, publicaciones_crear

url_publicaciones = f'{url_base}/publicaciones/'

router_publicacion = APIRouter(
    prefix="/publicaciones",
    tags=["publicaciones"]
)

@router_publicacion.get('/todas')
def listar_publicaciones():
    payload = ""
    headers = {}

    response = requests.request("GET", url_publicaciones, headers=headers, data=payload)
    
    return response.json()

@router_publicacion.get('/uno/{publicacion_id}')
def buscar_publicacion_por_id(publicacion_id: int):
    
    url = f'{url_publicaciones}/{publicacion_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    return response.json()

@router_publicacion.post('/crear')
def crear_publicacion(publicacion: publicaciones_crear):
        
    payload = json.dumps({
        "titulo": publicacion.titulo,
        "contenido": publicacion.contenido,
        "portada": publicacion.portada,
        "status": publicacion.status
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_publicaciones, headers=headers, data=payload)
    return response.json()

@router_publicacion.delete('/eliminar/{id}')
def eliminar_publicacion_por_id(id: int):
    
    url = f'{url_publicaciones}/{id}'

    payload = {}
    headers = {}

    response = requests.request("DELETE", url, headers=headers, data=payload)
    return response.json()

@router_publicacion.put('/actualizar')
def actualizar_publicacion_por_id(publicacion: publicaciones_actualizar):
    url = f'{url_publicaciones}/{publicacion.id}'

    payload = json.dumps({
        "titulo": publicacion.titulo,
        "contenido": publicacion.contenido,
        "portada": publicacion.portada,
        "status": publicacion.status
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()
