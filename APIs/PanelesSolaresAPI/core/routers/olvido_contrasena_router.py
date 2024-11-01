from fastapi import APIRouter, BackgroundTasks
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema
from pydantic import EmailStr, BaseModel
from typing import List
from helpers.config import conf

class EmailSchema(BaseModel):
    email: List[EmailStr]

router_olvido_contrasena = APIRouter(
    prefix="/olvido_contrasena",
    tags=["olvido_contrasena"]
)

@router_olvido_contrasena.post("/emailbackground")
async def send_in_background(
    background_tasks: BackgroundTasks,
    email: EmailSchema
    ) -> JSONResponse:

    # print (conf.MAIL_USERNAME)
    with open("./templates/email.html", "r") as file:
        html_content = file.read()

    message = MessageSchema(
        subject="Recuperación de cuenta",
        recipients=email.dict().get("email"),
        body= html_content,
        subtype= 'html'
        )

    fm = FastMail(conf)

    background_tasks.add_task(fm.send_message, message)

    return JSONResponse(status_code=200, content={"message": "email has been sent"})
    return 'asdf'