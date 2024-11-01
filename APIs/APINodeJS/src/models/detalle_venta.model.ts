import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { factura, facturaId } from './factura.model';
import type { producto, productoId } from './producto.model';

export interface detalle_ventaAttributes {
  servicio_venta_id: number;
  producto_id: number;
  cantidad: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type detalle_ventaPk = "servicio_venta_id" | "producto_id";
export type detalle_ventaId = detalle_venta[detalle_ventaPk];
export type detalle_ventaOptionalAttributes = "fecha_creacion" | "fecha_modificacion";
export type detalle_ventaCreationAttributes = Optional<detalle_ventaAttributes, detalle_ventaOptionalAttributes>;

export class detalle_venta extends Model<detalle_ventaAttributes, detalle_ventaCreationAttributes> implements detalle_ventaAttributes {
  servicio_venta_id!: number;
  producto_id!: number;
  cantidad!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // detalle_venta belongsTo factura via servicio_venta_id
  servicio_ventum!: factura;
  getServicio_ventum!: Sequelize.BelongsToGetAssociationMixin<factura>;
  setServicio_ventum!: Sequelize.BelongsToSetAssociationMixin<factura, facturaId>;
  createServicio_ventum!: Sequelize.BelongsToCreateAssociationMixin<factura>;
  // detalle_venta belongsTo producto via producto_id
  producto!: producto;
  getProducto!: Sequelize.BelongsToGetAssociationMixin<producto>;
  setProducto!: Sequelize.BelongsToSetAssociationMixin<producto, productoId>;
  createProducto!: Sequelize.BelongsToCreateAssociationMixin<producto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof detalle_venta {
    return detalle_venta.init({
    servicio_venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'factura',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producto',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.MEDIUMINT,
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
    tableName: 'detalle_venta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "servicio_venta_id" },
          { name: "producto_id" },
        ]
      },
      {
        name: "fk_servicio_venta_has_producto_producto1_idx",
        using: "BTREE",
        fields: [
          { name: "producto_id" },
        ]
      },
      {
        name: "fk_servicio_venta_has_producto_servicio_venta1_idx",
        using: "BTREE",
        fields: [
          { name: "servicio_venta_id" },
        ]
      },
    ]
  });
  }
}
