import os
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse
import requests
import json

from core.util.utilidades import crear_imagen_base64

from assets.util import url_base

from core.models.todos_model import Imagen_actualizar,Imagen_crear

url_imagenes = f'{url_base}/imagenes/'

router_imagen = APIRouter(
    prefix="/imagenes",
    tags=["imagenes"]
)

@router_imagen.get('/todas')
def listar_imagenes(request: Request):
    payload = ""
    headers = {}

    response = requests.request("GET", url_imagenes, headers=headers, data=payload)
    
    imagenes = response.json()

    for c in imagenes:
        nombre_archivo = f"{c['url']}"

        c['urlImagen'] = request.url_for('obtener_imagen_por_nombre', nombre=nombre_archivo)._url

    return imagenes

@router_imagen.get('/una/{imagen_id}')
def buscar_imagen_por_id(request: Request, imagen_id: int):
    
    url = f'{url_imagenes}/{imagen_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    
    imagen = response.json()

    nombre_archivo = f"{imagen['url']}"

    imagen['urlImagen'] = request.url_for('obtener_imagen_por_nombre', nombre=nombre_archivo)._url
    print(imagen)
    return imagen

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
    
    imagen_creada = response.json()

    nombre_carpeta = os.path.join('assets', 'images', f'{imagen.url}')
    crear_imagen_base64(imagen.portadaBase64, nombre_carpeta)

    return imagen_creada
    # return response.json()

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

@router_imagen.get('/imagen/{nombre}')
def obtener_imagen_por_nombre(nombre: str):
    nombre_archivo = os.path.join('assets', 'images', nombre)
    
    if not os.path.exists(nombre_archivo):
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
    
    # Retornar la imagen como respuesta
    return FileResponse(path=nombre_archivo, media_type='image/jpeg')