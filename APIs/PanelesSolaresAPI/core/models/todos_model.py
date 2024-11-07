from fastapi import FastAPI, Path
from pydantic import BaseModel, Field
from typing import Union
from datetime import datetime


class SuperClase(BaseModel):
    fecha_creacion: datetime = None
    fecha_modificacion: datetime = None
    

class Rol(SuperClase):
    nombre: str = Field(..., min_length=4, max_length=50)
    descripcion: str
    status: bool = None

class Rol_crear(BaseModel):
    nombre: str 
    descripcion: str
    status: bool = None
    
class Rol_actualizar(Rol_crear):
    id: int = Path(gt=0)
    nombre: str 
    descripcion: str
    status: bool = None

class Categoria_crear(BaseModel):
    nombre: str
    descripcion: str
    estado: int
    portada: str
    portadaBase64: str

class Categoria_actualizar(BaseModel):
    id: int
    nombre: str
    descripcion: str
    estado: int
    portada: str

class Contacto_crear(BaseModel):
    nombre: str
    email: str
    mensaje: str
    
class Contacto_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    email: str
    mensaje:str
    
class Detalle_venta_crear(BaseModel):
    servicio_venta_id: int = Path(gt=0)
    producto_id: int
    cantidad: int = Path(gt=0)
    
class Detalle_venta_actualizar(BaseModel):
    servicio_venta_id: int = Path(gt=0)
    producto_id: int = Path(gt=0)
    cantidad: int = Path(gt=0)
    
class Factura_crear(BaseModel):
    nombre: str
    fecha_ejecucion: str
    fecha_finalizacion: str
    servicio_tipo_id: int
    detalles: str
    referencia_cobro: str
    direccion: str
    status: bool
    tipo_pago_id: int = Path(gt=0)
    
class Factura_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    fecha_ejecucion: str
    fecha_finalizacion: str
    servicio_tipo_id: int
    detalles: str
    referencia_cobro: str
    direccion: str
    status: bool
    tipo_pago_id: int = Path(gt=0)
    
class Imagen_crear(BaseModel):
    nombre: str
    url: str
    producto_id: int = Path(gt=0)
    portadaBase64: str
    
class Imagen_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    url: str
    producto_id: int = Path(gt=0)
    
class modulo_crear(BaseModel):
    nombre: str
    
class modulo_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    
class permisos_crear(BaseModel):
    r: bool
    w: bool
    u: bool
    d: bool
    rol: str
    modulo_id: int = Path(gt=0)
    
class permisos_actualizar(BaseModel):
    id: int = Path(gt=0)
    r: bool
    w: bool
    u: bool
    d: bool
    modulo_id: int = Path(gt=0)
    
class persona_rol_crear(BaseModel):
    persona_id: int = Path(gt=0)
    rol_id: int = Path(gt=0)
    
class persona_rol_actualizar(BaseModel):
    persona_anterior_id: int = Path(gt=0)
    rol_anterior_id: int = Path(gt=0)
    nuevo_persona_id: int = Path(gt=0)
    nuevo_rol_id: int = Path(gt=0)
    
class persona_crear(BaseModel):
    nombre: str
    telefono: int
    email: str
    contrasena: str
    salario: int = Path(gt=0, le=100000000)
    direccion: str
    token: str
    status: bool
    
class persona_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    telefono: int
    email: str
    contrasena: str
    salario: int
    direccion: Union[str, None]
    token: str
    status: bool
    
class producto_categoria_crear(BaseModel):
    producto_id: int = Path(gt=0)
    categoria_id: int = Path(gt=0)
    
class producto_categoria_actualizar(BaseModel):
    producto_id: int = Path(gt=0)
    categoria_id: int = Path(gt=0)
    
class producto_crear(BaseModel):
    nombre: str
    referencia: str
    descripcion: str
    marca: str
    cantidad_minima: int = Path(gt=0)
    cantidad_actual: int = Path(gt=0)
    precio_compra: float = Path(gt=0)
    precio_venta: float = Path(gt=0)
    
class producto_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    referencia: str
    descripcion: str
    marca: str
    cantidad_minima: int = Path(gt=0)
    cantidad_actual: int = Path(gt=0)
    precio_compra: float = Path(gt=0)
    precio_venta: float = Path(gt=0)
    
class publicaciones_crear(BaseModel):
    titulo: str
    contenido: str
    portada: str
    status: bool
    
class publicaciones_actualizar(BaseModel):
    id: int = Path(gt=0)
    titulo: str
    contenido: str
    portada: str
    status: bool
    
class rol_permiso__crear(BaseModel):
    rol_id: int = Path(gt=0)
    permiso_id: int = Path(gt=0)
    
class rol_permiso__actualizar(BaseModel):
    rol_id: int = Path(gt=0)
    permiso_id: int = Path(gt=0)
    nuevo_rol_id: int = Path(gt=0)
    nuevo_permiso_id: int = Path(gt=0)
    
class servicio_rol_crear(BaseModel):
    nombre: str
    
class servicio_rol_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    
class tipo_pago_crear(BaseModel):
    nombre: str
    status: bool
    
class tipo_pago_actualizar(BaseModel):
    id: int = Path(gt=0)
    nombre: str
    status: bool

class Login(BaseModel):
    username: str
    password: str