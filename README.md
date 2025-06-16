# TiendaVirtual - Plataforma E-commerce Modular

Plataforma e-commerce completa para paneles solares (adaptable a cualquier producto) con dashboard administrativo, autenticación JWT, gestión de roles y múltiples tecnologías en backend y frontend.

## Características Principales
- ✅ Dashboard administrativo con métricas
- 🔐 Autenticación JWT OAuth2 y recuperación de contraseña
- 👥 Sistema de roles y permisos granular
- 🛒 Carrito de compras y gestión de productos
- 📦 Módulos independientes (productos, categorías, facturación, etc.)
- 📱 Frontends en Angular (admin) y React (tienda)
- ⚙️ Backends en Node.js y Python Flask

## Tecnologías Utilizadas

### Backend
| Tecnología         | Uso                               |
|--------------------|-----------------------------------|
| **Node.js**        | API principal con Express         |
| **Python Flask**   | Microservicios adicionales        |
| **Sequelize**      | ORM para Node.js                  |
| **SQLAlchemy**     | ORM para Python                   |
| **JWT**            | Autenticación y seguridad         |
| **MySQL**          | Base de datos principal           |

### Frontend
| Tecnología         | Uso                               |
|--------------------|-----------------------------------|
| **Angular 16**     | Panel administrativo              |
| **React 18**       | Tienda virtual para clientes      |
| **Tailwind CSS**   | Estilos en React                  |
| **CoreUI**         | Framework para Angular dashboard  |
| **React Hook Form**| Gestión de formularios            |

## Estructura del Proyecto
```bash
  TiendaVirtual/
  ├── apinodejs/          # Backend Node.js
  ├── apifastapi/         # Backend Python Flask
  ├── admin-angular/      # Dashboard Angular
  └── shop-react/         # Tienda React
```

## Vista previa del Proyecto

|                                  |                                 |
|----------------------------------|---------------------------------|
| ![Imagen 1](https://github.com/Juliandos/TiendaVirtual-picoypala/blob/main/Imagenes/2024-07-07_145244.jpg)|![Imagen 6](https://github.com/Juliandos/TiendaVirtual-picoypala/blob/main/Imagenes/2024-07-07_145341.jpg)

|                                  |                                 |
|----------------------------------|---------------------------------|
| ![Imagen 2](https://github.com/Juliandos/TiendaVirtual-picoypala/blob/main/Imagenes/2024-07-07_145401.jpg) | ![Imagen 2](https://github.com/Juliandos/TiendaVirtual-picoypala/blob/main/Imagenes/2024-07-07_145418.jpg) |

## Instalación y Configuración

### 1. Backend Node.js
```bash
cd apinodejs
npm install
npm run dev  # Inicia con nodemon
```

### 2. Backend Python Flask
```bash
cd apifastapi
pip install -r requirements.txt
uvicorn main:app --reload  # Inicia servidor
```

### 3. FrontEnd Angular Adinistración
```bash
cd admin-angular
npm install
ng serve -o  # Abre en navegador
```

### 4. Frontend React (Tienda)
```bash
cd shop-react
npm install
npm run dev
```

## configuración de entorno

Crea un archivo .env en cada uno de los proyectos con las siguientes variables:

### Node.js (apinodejs/.env)
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=pass123
DB_NAME=tiendavirtual
JWT_SECRET=mi_secreto_jwt
```

### Python (apifastapi/.env)
```bash
DATABASE_URL=mysql+mysqlconnector://user:password@localhost/tiendavirtual
SMTP_USER=correo@ejemplo.com
SMTP_PASSWORD=email_password
```
*Hecho con :heart: por [Julian Ortega](https://github.com/Juliandos).*
