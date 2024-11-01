from fastapi import FastAPI
from core.routers.producto_router import router_producto
from core.routers.persona_router import router_persona
from core.routers.contacto_router import router_contacto
from core.routers.servicio_tipo_router import router_tipo_servicio
from core.routers.publicacion_router import router_publicacion
from core.routers.categoria_router import router_categoria
from core.routers.imagen_router import router_imagen
from core.routers.tipopago_router import router_tipo_pago
from core.routers.permisos_router import router_permisos
from core.routers.detalle_venta_router import router_detalle_venta
from core.routers.factura_router import router_factura
from core.routers.modulo_router import router_modulo
from core.routers.persona_rol_router import router_persona_rol
from core.routers.producto_categoria_router import router_producto_categoria
from core.routers.rol_permiso_router import router_rol_permiso
from core.routers.rol_router import router_rol
from core.routers.login_router import router_login
from core.routers.olvido_contrasena_router import router_olvido_contrasena

from fastapi.middleware.cors import CORSMiddleware

description = """
ChimichangApp API helps you do awesome stuff. 🚀

## Items

You can **read items**.

## Users

You will be able to:

* **Create users** (_not implemented_).
* **Read users** (_not implemented_).
"""

app = FastAPI(
    # title="ChimichangApp",
    # description=description,
    # summary="Deadpool's favorite app. Nuff said.",
    # version="0.0.1",
    # terms_of_service="http://example.com/terms/",
    # contact={
    #     "name": "Deadpoolio the Amazing",
    #     "url": "http://x-force.example.com/contact/",
    #     "email": "dp@x-force.example.com",
    # },
    # license_info={
    #     "name": "Apache 2.0",
    #     "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    # },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router_olvido_contrasena)
app.include_router(router_login)
app.include_router(router_producto)
app.include_router(router_persona)
app.include_router(router_contacto)
app.include_router(router_tipo_servicio)
app.include_router(router_publicacion)
app.include_router(router_categoria)
app.include_router(router_imagen)
app.include_router(router_tipo_pago)
app.include_router(router_permisos)
app.include_router(router_detalle_venta)
app.include_router(router_factura)
app.include_router(router_modulo)
app.include_router(router_persona_rol)
app.include_router(router_producto_categoria)
app.include_router(router_rol_permiso)
app.include_router(router_rol)
