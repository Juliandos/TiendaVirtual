import type { Sequelize } from "sequelize";
import { categoria as _categoria } from "./categoria.model";
import type { categoriaAttributes, categoriaCreationAttributes } from "./categoria.model";
import { contacto as _contacto } from "./contacto.model";
import type { contactoAttributes, contactoCreationAttributes } from "./contacto.model";
import { detalle_venta as _detalle_venta } from "./detalle_venta.model";
import type { detalle_ventaAttributes, detalle_ventaCreationAttributes } from "./detalle_venta.model";
import { factura as _factura } from "./factura.model";
import type { facturaAttributes, facturaCreationAttributes } from "./factura.model";
import { imagen as _imagen } from "./imagen.model";
import type { imagenAttributes, imagenCreationAttributes } from "./imagen.model";
import { modulo as _modulo } from "./modulo.model";
import type { moduloAttributes, moduloCreationAttributes } from "./modulo.model";
import { permisos as _permisos } from "./permisos.model";
import type { permisosAttributes, permisosCreationAttributes } from "./permisos.model";
import { persona as _persona } from "./persona.model";
import type { personaAttributes, personaCreationAttributes } from "./persona.model";
import { persona_rol as _persona_rol } from "./persona_rol.model";
import type { persona_rolAttributes, persona_rolCreationAttributes } from "./persona_rol.model";
import { producto as _producto } from "./producto.model";
import type { productoAttributes, productoCreationAttributes } from "./producto.model";
import { producto_categoria as _producto_categoria } from "./producto_categoria.model";
import type { producto_categoriaAttributes, producto_categoriaCreationAttributes } from "./producto_categoria.model";
import { publicacion as _publicacion } from "./publicacion.model";
import type { publicacionAttributes, publicacionCreationAttributes } from "./publicacion.model";
import { rol as _rol } from "./rol.model";
import type { rolAttributes, rolCreationAttributes } from "./rol.model";
import { rol_permisos as _rol_permisos } from "./rol_permisos.model";
import type { rol_permisosAttributes, rol_permisosCreationAttributes } from "./rol_permisos.model";
import { servicio_tipo as _servicio_tipo } from "./servicio_tipo.model";
import type { servicio_tipoAttributes, servicio_tipoCreationAttributes } from "./servicio_tipo.model";
import { tipo_pago as _tipo_pago } from "./tipo_pago.model";
import type { tipo_pagoAttributes, tipo_pagoCreationAttributes } from "./tipo_pago.model";

export {
  _categoria as categoria,
  _contacto as contacto,
  _detalle_venta as detalle_venta,
  _factura as factura,
  _imagen as imagen,
  _modulo as modulo,
  _permisos as permisos,
  _persona as persona,
  _persona_rol as persona_rol,
  _producto as producto,
  _producto_categoria as producto_categoria,
  _publicacion as publicacion,
  _rol as rol,
  _rol_permisos as rol_permisos,
  _servicio_tipo as servicio_tipo,
  _tipo_pago as tipo_pago,
};

export type {
  categoriaAttributes,
  categoriaCreationAttributes,
  contactoAttributes,
  contactoCreationAttributes,
  detalle_ventaAttributes,
  detalle_ventaCreationAttributes,
  facturaAttributes,
  facturaCreationAttributes,
  imagenAttributes,
  imagenCreationAttributes,
  moduloAttributes,
  moduloCreationAttributes,
  permisosAttributes,
  permisosCreationAttributes,
  personaAttributes,
  personaCreationAttributes,
  persona_rolAttributes,
  persona_rolCreationAttributes,
  productoAttributes,
  productoCreationAttributes,
  producto_categoriaAttributes,
  producto_categoriaCreationAttributes,
  publicacionAttributes,
  publicacionCreationAttributes,
  rolAttributes,
  rolCreationAttributes,
  rol_permisosAttributes,
  rol_permisosCreationAttributes,
  servicio_tipoAttributes,
  servicio_tipoCreationAttributes,
  tipo_pagoAttributes,
  tipo_pagoCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const categoria = _categoria.initModel(sequelize);
  const contacto = _contacto.initModel(sequelize);
  const detalle_venta = _detalle_venta.initModel(sequelize);
  const factura = _factura.initModel(sequelize);
  const imagen = _imagen.initModel(sequelize);
  const modulo = _modulo.initModel(sequelize);
  const permisos = _permisos.initModel(sequelize);
  const persona = _persona.initModel(sequelize);
  const persona_rol = _persona_rol.initModel(sequelize);
  const producto = _producto.initModel(sequelize);
  const producto_categoria = _producto_categoria.initModel(sequelize);
  const publicacion = _publicacion.initModel(sequelize);
  const rol = _rol.initModel(sequelize);
  const rol_permisos = _rol_permisos.initModel(sequelize);
  const servicio_tipo = _servicio_tipo.initModel(sequelize);
  const tipo_pago = _tipo_pago.initModel(sequelize);

  categoria.belongsToMany(producto, { as: 'producto_id_producto_producto_categoria', through: producto_categoria, foreignKey: "categoria_id", otherKey: "producto_id" });
  factura.belongsToMany(producto, { as: 'producto_id_productos', through: detalle_venta, foreignKey: "servicio_venta_id", otherKey: "producto_id" });
  permisos.belongsToMany(rol, { as: 'rol_id_rol_rol_permisos', through: rol_permisos, foreignKey: "permisos_id", otherKey: "rol_id" });
  persona.belongsToMany(rol, { as: 'rol_id_rols', through: persona_rol, foreignKey: "persona_id", otherKey: "rol_id" });
  producto.belongsToMany(categoria, { as: 'categoria_id_categoria', through: producto_categoria, foreignKey: "producto_id", otherKey: "categoria_id" });
  producto.belongsToMany(factura, { as: 'servicio_venta_id_facturas', through: detalle_venta, foreignKey: "producto_id", otherKey: "servicio_venta_id" });
  rol.belongsToMany(permisos, { as: 'permisos_id_permisos', through: rol_permisos, foreignKey: "rol_id", otherKey: "permisos_id" });
  rol.belongsToMany(persona, { as: 'persona_id_personas', through: persona_rol, foreignKey: "rol_id", otherKey: "persona_id" });
  producto_categoria.belongsTo(categoria, { as: "categorium", foreignKey: "categoria_id"});
  categoria.hasMany(producto_categoria, { as: "producto_categoria", foreignKey: "categoria_id"});
  detalle_venta.belongsTo(factura, { as: "servicio_ventum", foreignKey: "servicio_venta_id"});
  factura.hasMany(detalle_venta, { as: "detalle_venta", foreignKey: "servicio_venta_id"});
  permisos.belongsTo(modulo, { as: "modulo", foreignKey: "modulo_id"});
  modulo.hasMany(permisos, { as: "permisos", foreignKey: "modulo_id"});
  rol_permisos.belongsTo(permisos, { as: "permiso", foreignKey: "permisos_id"});
  permisos.hasMany(rol_permisos, { as: "rol_permisos", foreignKey: "permisos_id"});
  persona_rol.belongsTo(persona, { as: "persona", foreignKey: "persona_id"});
  persona.hasMany(persona_rol, { as: "persona_rols", foreignKey: "persona_id"});
  detalle_venta.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(detalle_venta, { as: "detalle_venta", foreignKey: "producto_id"});
  imagen.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(imagen, { as: "imagens", foreignKey: "producto_id"});
  producto_categoria.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(producto_categoria, { as: "producto_categoria", foreignKey: "producto_id"});
  persona_rol.belongsTo(rol, { as: "rol", foreignKey: "rol_id"});
  rol.hasMany(persona_rol, { as: "persona_rols", foreignKey: "rol_id"});
  rol_permisos.belongsTo(rol, { as: "rol", foreignKey: "rol_id"});
  rol.hasMany(rol_permisos, { as: "rol_permisos", foreignKey: "rol_id"});
  factura.belongsTo(servicio_tipo, { as: "servicio_tipo", foreignKey: "servicio_tipo_id"});
  servicio_tipo.hasMany(factura, { as: "facturas", foreignKey: "servicio_tipo_id"});
  factura.belongsTo(tipo_pago, { as: "tipo_pago", foreignKey: "tipo_pago_id"});
  tipo_pago.hasMany(factura, { as: "facturas", foreignKey: "tipo_pago_id"});

  return {
    categoria: categoria,
    contacto: contacto,
    detalle_venta: detalle_venta,
    factura: factura,
    imagen: imagen,
    modulo: modulo,
    permisos: permisos,
    persona: persona,
    persona_rol: persona_rol,
    producto: producto,
    producto_categoria: producto_categoria,
    publicacion: publicacion,
    rol: rol,
    rol_permisos: rol_permisos,
    servicio_tipo: servicio_tipo,
    tipo_pago: tipo_pago,
  };
}
