import base64
from PIL import Image
from io import BytesIO
import datetime
import os

from pydantic import BaseModel


def remover_nones(model_obj):
    if isinstance(model_obj, BaseModel):
        return {k: v for k, v in model_obj.dict().items() if "datetime" not in str(type(v))}
    else:
        raise ValueError("El objeto no es una instancia de BaseModel")

# def remover_nones(model_obj):
#     return {k: v for k, v in model_obj.dict().items() if v is not None}

def convertir_datetime_a_str(model_obj):
    if isinstance(model_obj, BaseModel):
        converted_dict = {}
        for field_name, field_value in model_obj.dict().items():
            # print(type(field_name), type(field_value))
            if "datetime" in str(type(field_value)):
                converted_value = field_value.strftime("%Y-%m-%d %H:%M:%S")
                converted_dict[field_name] = converted_value
                # return "bien"
            else:
                converted_dict[field_name] = field_value
        return converted_dict
    else:
        raise ValueError("El objeto no es una instancia de BaseModel")


def serializar_datetime(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError("Tipo no serializable")

def crear_imagen_base64(hash, nombre_archivo):
    image_data = base64.b64decode(hash)

    image = Image.open(BytesIO(image_data))

    image.save(nombre_archivo)
