from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Modelo Pydantic para el objeto Usuario
class Usuario(BaseModel):
    nombre: str
    edad: int
    email: str

# Lista de usuarios (datos simulados)
usuarios = []

@app.get('/')
def index():
    return {'mensaje': '¡Hola, mundo!'}

# Ruta para obtener todos los usuarios
@app.get('/usuarios/')
def obtener_usuarios():
    return usuarios

# Ruta para agregar un nuevo usuario
@app.post('/usuarios/')
def agregar_usuario(usuario: Usuario):
    usuarios.append(usuario)
    return {'mensaje': 'Usuario agregado correctamente'}
