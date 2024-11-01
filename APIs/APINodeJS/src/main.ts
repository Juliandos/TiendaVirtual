import express from 'express'; // Esto el omologo en TS
import cors from 'cors';
import mysql, { Connection, FieldInfo, MysqlError } from 'mysql';
import { Sequelize } from 'sequelize';
import { initModels } from './models/init-models.model';
import productoRouter from './routes/producto.router';
import categoriaRouter from './routes/categoria.router';
import personaRouter from './routes/persona.router';
import contactoRouter from './routes/contacto.router';
import facturaRouter from './routes/factura.router';
import imagenRouter from './routes/imagen.router';
import servicio_tipoRouter from './routes/servicio_tipo.router';
import tipo_pagoRouter from './routes/tipo_pago.router';
import rolRouter from './routes/rol.router';
import detalle_ventaRouter from './routes/detalle_venta.router';
import producto_categoriaRouter from './routes/producto_categoria.router';
import moduloRouter from './routes/modulo.router';
import publicacionRouter from './routes/publicacion.router';
import persona_rolRouter from './routes/persona_rol.router';
import rol_permisosRouter from './routes/rol_permisos.router';
import permisosRouter from './routes/permisos.router';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'panelessolares',
});

initModels(sequelize);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/productos', productoRouter);
app.use('/categorias', categoriaRouter);
app.use('/personas', personaRouter);
app.use('/contactos', contactoRouter);
app.use('/facturas', facturaRouter);
app.use('/imagenes',imagenRouter);
app.use('/servicio_tipos',servicio_tipoRouter);
app.use('/tipo_pagos',tipo_pagoRouter);
app.use('/roles',rolRouter);
app.use('/detalle_ventas',detalle_ventaRouter);
app.use('/producto_categorias',producto_categoriaRouter);
app.use('/modulos',moduloRouter);
app.use('/publicaciones',publicacionRouter);
app.use('/persona_roles',persona_rolRouter);
app.use('/rol_permisos',rol_permisosRouter);
app.use('/permisos',permisosRouter);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
