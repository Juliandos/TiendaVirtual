# TiendaVirtual - Plataforma E-commerce Modular

![Logo de la TiendaVirtual](https://via.placeholder.com/150x80?text=Logo) <!-- Reemplazar con imagen 1 -->

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
