from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from core.routers.persona_router import login as login_persona

# login
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10
# 

router_login = APIRouter(
    prefix="/login",
    tags=["login"]
)

class Token(BaseModel):
    """
    Representa un token de acceso.
    """
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """
    Representa los datos de un token de acceso.
    """
    username: str | None = None

class User(BaseModel):
    """
    Representa un usuario.
    """
    nombre: str
    telefono: int
    email: str | None = None
    contrasena: str | None = None
    salario: str | None = None
    direccion: str | None = None
    token: str | None = None

class UserInDB(User):
    """
    Representa un usuario en la base de datos.
    """
    contrasena: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):
    """
    Simula una función que obtiene un usuario de una base de datos.
    """
    if username in db.values():
        # user_dict = db['nombre']
        return db
    # if username in db:
    #     user_dict = db[username]
    #     return UserInDB(**user_dict)

def authenticate_user(username: str, password: str):
    user = login_persona(username) 
    if not user:
        return False
    if 'contrasena' not in user or not verify_password(password, user['contrasena']):
        return False
    
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Crea un token de acceso.

    :param data: Datos que se incluirán en el token.
    :param expires_delta: Tiempo de expiración del token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Obtiene el usuario actual a partir de un token.

    :param token: Token de acceso.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    login_persona(username) 
    user = get_user(login_persona(username), username=token_data.username)
    # if user is None:
    #     raise credentials_exception
    
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    """
    Simula una función que obtiene un usuario actual activo a partir de un token.
    """
    if not current_user['status']:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    return current_user

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router_login.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Obtiene un token de acceso.

    :param form_data: Datos del formulario.
    :return: Token de acceso.
    """
    # print(form_data.username, form_data.password)
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(data={"sub": user['email']}, expires_delta=access_token_expires)

    # access_token_verify = verify_token(access_token)
    # print(access_token_verify)
    return {"access_token": access_token, "token_type": "bearer"}

@router_login.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    """
    Obtiene el usuario actual.

    :param current_user: Usuario actual.

    :return: Usuario actual.
    """
    return current_user

@router_login.get("/protected")
async def protected_route(payload: dict = Depends(verify_token)):
    # Si el token es válido, devuelve el payload decodificado
    # print(payload)
    return payload

@router_login.get("/email/{email}")
async def protected_route(email: str):
    # print(email)
    user = login_persona(email)
    # if user:
    #     return True
    # else:
    #     return False
    return user

@router_login.get("/hash/{password}")
async def hash_password(password: str):
    print(password)
    return get_password_hash(password)