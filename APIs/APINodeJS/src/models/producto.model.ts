import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categoria, categoriaId } from './categoria.model';
import type { detalle_venta, detalle_ventaId } from './detalle_venta.model';
import type { factura, facturaId } from './factura.model';
import type { imagen, imagenId } from './imagen.model';
import type { producto_categoria, producto_categoriaId } from './producto_categoria.model';

export interface productoAttributes {
  id: number;
  nombre: string;
  referencia: string;
  descripcion?: string;
  marca: string;
  cantidad_minima: number;
  cantidad_actual: number;
  precio_compra: number;
  precio_venta: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type productoPk = "id";
export type productoId = producto[productoPk];
export type productoOptionalAttributes = "id" | "descripcion" | "fecha_creacion" | "fecha_modificacion";
export type productoCreationAttributes = Optional<productoAttributes, productoOptionalAttributes>;

export class producto extends Model<productoAttributes, productoCreationAttributes> implements productoAttributes {
  id!: number;
  nombre!: string;
  referencia!: string;
  descripcion?: string;
  marca!: string;
  cantidad_minima!: number;
  cantidad_actual!: number;
  precio_compra!: number;
  precio_venta!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // producto belongsToMany categoria via producto_id and categoria_id
  categoria_id_categoria!: categoria[];
  getCategoria_id_categoria!: Sequelize.BelongsToManyGetAssociationsMixin<categoria>;
  setCategoria_id_categoria!: Sequelize.BelongsToManySetAssociationsMixin<categoria, categoriaId>;
  addCategoria_id_categorium!: Sequelize.BelongsToManyAddAssociationMixin<categoria, categoriaId>;
  addCategoria_id_categoria!: Sequelize.BelongsToManyAddAssociationsMixin<categoria, categoriaId>;
  createCategoria_id_categorium!: Sequelize.BelongsToManyCreateAssociationMixin<categoria>;
  removeCategoria_id_categorium!: Sequelize.BelongsToManyRemoveAssociationMixin<categoria, categoriaId>;
  removeCategoria_id_categoria!: Sequelize.BelongsToManyRemoveAssociationsMixin<categoria, categoriaId>;
  hasCategoria_id_categorium!: Sequelize.BelongsToManyHasAssociationMixin<categoria, categoriaId>;
  hasCategoria_id_categoria!: Sequelize.BelongsToManyHasAssociationsMixin<categoria, categoriaId>;
  countCategoria_id_categoria!: Sequelize.BelongsToManyCountAssociationsMixin;
  // producto hasMany detalle_venta via producto_id
  detalle_venta!: detalle_venta[];
  getDetalle_venta!: Sequelize.HasManyGetAssociationsMixin<detalle_venta>;
  setDetalle_venta!: Sequelize.HasManySetAssociationsMixin<detalle_venta, detalle_ventaId>;
  addDetalle_ventum!: Sequelize.HasManyAddAssociationMixin<detalle_venta, detalle_ventaId>;
  addDetalle_venta!: Sequelize.HasManyAddAssociationsMixin<detalle_venta, detalle_ventaId>;
  createDetalle_ventum!: Sequelize.HasManyCreateAssociationMixin<detalle_venta>;
  removeDetalle_ventum!: Sequelize.HasManyRemoveAssociationMixin<detalle_venta, detalle_ventaId>;
  removeDetalle_venta!: Sequelize.HasManyRemoveAssociationsMixin<detalle_venta, detalle_ventaId>;
  hasDetalle_ventum!: Sequelize.HasManyHasAssociationMixin<detalle_venta, detalle_ventaId>;
  hasDetalle_venta!: Sequelize.HasManyHasAssociationsMixin<detalle_venta, detalle_ventaId>;
  countDetalle_venta!: Sequelize.HasManyCountAssociationsMixin;
  // producto belongsToMany factura via producto_id and servicio_venta_id
  servicio_venta_id_facturas!: factura[];
  getServicio_venta_id_facturas!: Sequelize.BelongsToManyGetAssociationsMixin<factura>;
  setServicio_venta_id_facturas!: Sequelize.BelongsToManySetAssociationsMixin<factura, facturaId>;
  addServicio_venta_id_factura!: Sequelize.BelongsToManyAddAssociationMixin<factura, facturaId>;
  addServicio_venta_id_facturas!: Sequelize.BelongsToManyAddAssociationsMixin<factura, facturaId>;
  createServicio_venta_id_factura!: Sequelize.BelongsToManyCreateAssociationMixin<factura>;
  removeServicio_venta_id_factura!: Sequelize.BelongsToManyRemoveAssociationMixin<factura, facturaId>;
  removeServicio_venta_id_facturas!: Sequelize.BelongsToManyRemoveAssociationsMixin<factura, facturaId>;
  hasServicio_venta_id_factura!: Sequelize.BelongsToManyHasAssociationMixin<factura, facturaId>;
  hasServicio_venta_id_facturas!: Sequelize.BelongsToManyHasAssociationsMixin<factura, facturaId>;
  countServicio_venta_id_facturas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // producto hasMany imagen via producto_id
  imagens!: imagen[];
  getImagens!: Sequelize.HasManyGetAssociationsMixin<imagen>;
  setImagens!: Sequelize.HasManySetAssociationsMixin<imagen, imagenId>;
  addImagen!: Sequelize.HasManyAddAssociationMixin<imagen, imagenId>;
  addImagens!: Sequelize.HasManyAddAssociationsMixin<imagen, imagenId>;
  createImagen!: Sequelize.HasManyCreateAssociationMixin<imagen>;
  removeImagen!: Sequelize.HasManyRemoveAssociationMixin<imagen, imagenId>;
  removeImagens!: Sequelize.HasManyRemoveAssociationsMixin<imagen, imagenId>;
  hasImagen!: Sequelize.HasManyHasAssociationMixin<imagen, imagenId>;
  hasImagens!: Sequelize.HasManyHasAssociationsMixin<imagen, imagenId>;
  countImagens!: Sequelize.HasManyCountAssociationsMixin;
  // producto hasMany producto_categoria via producto_id
  producto_categoria!: producto_categoria[];
  getProducto_categoria!: Sequelize.HasManyGetAssociationsMixin<producto_categoria>;
  setProducto_categoria!: Sequelize.HasManySetAssociationsMixin<producto_categoria, producto_categoriaId>;
  addProducto_categorium!: Sequelize.HasManyAddAssociationMixin<producto_categoria, producto_categoriaId>;
  addProducto_categoria!: Sequelize.HasManyAddAssociationsMixin<producto_categoria, producto_categoriaId>;
  createProducto_categorium!: Sequelize.HasManyCreateAssociationMixin<producto_categoria>;
  removeProducto_categorium!: Sequelize.HasManyRemoveAssociationMixin<producto_categoria, producto_categoriaId>;
  removeProducto_categoria!: Sequelize.HasManyRemoveAssociationsMixin<producto_categoria, producto_categoriaId>;
  hasProducto_categorium!: Sequelize.HasManyHasAssociationMixin<producto_categoria, producto_categoriaId>;
  hasProducto_categoria!: Sequelize.HasManyHasAssociationsMixin<producto_categoria, producto_categoriaId>;
  countProducto_categoria!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof producto {
    return producto.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    referencia: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: "referencia_UNIQUE"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    marca: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    cantidad_minima: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    },
    cantidad_actual: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    },
    precio_compra: {
      type: DataTypes.DECIMAL(11,0),
      allowNull: false
    },
    precio_venta: {
      type: DataTypes.DECIMAL(11,0),
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    fecha_modificacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'producto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "referencia_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "referencia" },
        ]
      },
    ]
  });
  }
}
