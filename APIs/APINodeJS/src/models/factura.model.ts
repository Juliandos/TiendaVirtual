import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { detalle_venta, detalle_ventaId } from './detalle_venta.model';
import type { producto, productoId } from './producto.model';
import type { servicio_tipo, servicio_tipoId } from './servicio_tipo.model';
import type { tipo_pago, tipo_pagoId } from './tipo_pago.model';

export interface facturaAttributes {
  id: number;
  nombre: string;
  fecha_ejecucion: string;
  fecha_finalizacion?: string;
  servicio_tipo_id: number;
  detalles: string;
  referencia_cobro: string;
  direccion?: string;
  status: number;
  tipo_pago_id: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type facturaPk = "id";
export type facturaId = factura[facturaPk];
export type facturaOptionalAttributes = "id" | "fecha_finalizacion" | "direccion" | "status" | "fecha_creacion" | "fecha_modificacion";
export type facturaCreationAttributes = Optional<facturaAttributes, facturaOptionalAttributes>;

export class factura extends Model<facturaAttributes, facturaCreationAttributes> implements facturaAttributes {
  id!: number;
  nombre!: string;
  fecha_ejecucion!: string;
  fecha_finalizacion?: string;
  servicio_tipo_id!: number;
  detalles!: string;
  referencia_cobro!: string;
  direccion?: string;
  status!: number;
  tipo_pago_id!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // factura hasMany detalle_venta via servicio_venta_id
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
  // factura belongsToMany producto via servicio_venta_id and producto_id
  producto_id_productos!: producto[];
  getProducto_id_productos!: Sequelize.BelongsToManyGetAssociationsMixin<producto>;
  setProducto_id_productos!: Sequelize.BelongsToManySetAssociationsMixin<producto, productoId>;
  addProducto_id_producto!: Sequelize.BelongsToManyAddAssociationMixin<producto, productoId>;
  addProducto_id_productos!: Sequelize.BelongsToManyAddAssociationsMixin<producto, productoId>;
  createProducto_id_producto!: Sequelize.BelongsToManyCreateAssociationMixin<producto>;
  removeProducto_id_producto!: Sequelize.BelongsToManyRemoveAssociationMixin<producto, productoId>;
  removeProducto_id_productos!: Sequelize.BelongsToManyRemoveAssociationsMixin<producto, productoId>;
  hasProducto_id_producto!: Sequelize.BelongsToManyHasAssociationMixin<producto, productoId>;
  hasProducto_id_productos!: Sequelize.BelongsToManyHasAssociationsMixin<producto, productoId>;
  countProducto_id_productos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // factura belongsTo servicio_tipo via servicio_tipo_id
  servicio_tipo!: servicio_tipo;
  getServicio_tipo!: Sequelize.BelongsToGetAssociationMixin<servicio_tipo>;
  setServicio_tipo!: Sequelize.BelongsToSetAssociationMixin<servicio_tipo, servicio_tipoId>;
  createServicio_tipo!: Sequelize.BelongsToCreateAssociationMixin<servicio_tipo>;
  // factura belongsTo tipo_pago via tipo_pago_id
  tipo_pago!: tipo_pago;
  getTipo_pago!: Sequelize.BelongsToGetAssociationMixin<tipo_pago>;
  setTipo_pago!: Sequelize.BelongsToSetAssociationMixin<tipo_pago, tipo_pagoId>;
  createTipo_pago!: Sequelize.BelongsToCreateAssociationMixin<tipo_pago>;

  static initModel(sequelize: Sequelize.Sequelize): typeof factura {
    return factura.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    fecha_ejecucion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_finalizacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    servicio_tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'servicio_tipo',
        key: 'id'
      }
    },
    detalles: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    referencia_cobro: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "referencia_cobro_UNIQUE"
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    tipo_pago_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_pago',
        key: 'id'
      }
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
    tableName: 'servicio_venta',
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
        name: "referencia_cobro_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "referencia_cobro" },
        ]
      },
      {
        name: "fk_servicio_servicio_tipo1_idx",
        using: "BTREE",
        fields: [
          { name: "servicio_tipo_id" },
        ]
      },
      {
        name: "fk_servicio_venta_tipo_pago1_idx",
        using: "BTREE",
        fields: [
          { name: "tipo_pago_id" },
        ]
      },
    ]
  });
  }
}
