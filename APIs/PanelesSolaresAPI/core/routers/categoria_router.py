import base64
import os

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse
import requests
import json

from assets.util import url_base

from core.util.utilidades import crear_imagen_base64

from core.models.todos_model import Categoria_actualizar, Categoria_crear

url_categorias = f'{url_base}/categorias/'

router_categoria = APIRouter(
    prefix="/categorias",
    tags=["categorias"]
)

@router_categoria.get('/todas')
def listar_categorias(request: Request):
    payload = ""
    headers = {}

    response = requests.request("GET", url_categorias, headers=headers, data=payload)

    categorias = response.json()

    for c in categorias:
        nombre_archivo = f"{c['portada']}"

        c['urlImagen'] = request.url_for('obtener_imagen_por_nombre', nombre=nombre_archivo)._url
    
    return categorias


@router_categoria.get('/una/{categoria_id}')#?categoria_id=3
def buscar_categoria_por_id(request: Request, categoria_id: int):
    
    url = f'{url_categorias}/{categoria_id}'
    payload = ""
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    categoria = response.json()

    nombre_archivo = f"{categoria['portada']}"

    categoria['urlImagen'] = request.url_for('obtener_imagen_por_nombre', nombre=nombre_archivo)._url
    
    return categoria

@router_categoria.post('/crear')
def crear_categoria(Categoria: Categoria_crear):

    payload = json.dumps({
        "nombre": Categoria.nombre,
        "descripcion": Categoria.descripcion,
        "estado": Categoria.estado,
        "portada": Categoria.portada
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url_categorias, headers=headers, data=payload)

    categoria_creada = response.json()

    nombre_archivo = os.path.join('assets', 'images', f'{categoria_creada["id"]}-{Categoria.portada}')
    crear_imagen_base64(Categoria.portadaBase64, nombre_archivo)

    return categoria_creada

@router_categoria.delete('/eliminar/{id}')
def eliminar_categoria_por_id(id: int):
    
    url = f'{url_categorias}{id}'

    response = requests.delete(url)
    return response.json()

@router_categoria.put('/actualizar')
def actualizar_categoria_por_id(Categoria: Categoria_actualizar):
    url = f'{url_categorias}/{Categoria.id}'

    payload = json.dumps({
    "id": Categoria.id,
    "nombre": Categoria.nombre,
    "descripcion": Categoria.descripcion,
    "estado": Categoria.estado,
    "portada": Categoria.portada
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)
    return response.json()


@router_categoria.get('/imagen/{nombre}')
def actualizar_imagen_por_id(nombre: str):
    nombre_archivo = os.path.join('assets', 'images', nombre)
    
    # Verificar si el archivo existe
    if not os.path.exists(nombre_archivo):
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
    
    # Retornar la imagen como respuesta
    return FileResponse(path=nombre_archivo, media_type='image/jpeg') # MIME type


@router_categoria.get('/imagen/{nombre}')
def obtener_imagen_por_nombre(nombre: str):
    # Construir la ruta completa del archivo
    nombre_archivo = os.path.join('assets', 'images', nombre)
    
    # Verificar si el archivo existe
    if not os.path.exists(nombre_archivo):
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
    
    # Retornar la imagen como respuesta
    return FileResponse(path=nombre_archivo, media_type='image/jpeg')


def obtener_url_imagen_por_nombre(nombre: str, request):
    return request.url_for('obtener_imagen_por_nombre', nombre=nombre)
