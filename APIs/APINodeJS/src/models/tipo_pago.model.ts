import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { factura, facturaId } from './factura.model';

export interface tipo_pagoAttributes {
  id: number;
  nombre: string;
  status: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type tipo_pagoPk = "id";
export type tipo_pagoId = tipo_pago[tipo_pagoPk];
export type tipo_pagoOptionalAttributes = "id" | "fecha_creacion" | "fecha_modificacion";
export type tipo_pagoCreationAttributes = Optional<tipo_pagoAttributes, tipo_pagoOptionalAttributes>;

export class tipo_pago extends Model<tipo_pagoAttributes, tipo_pagoCreationAttributes> implements tipo_pagoAttributes {
  id!: number;
  nombre!: string;
  status!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // tipo_pago hasMany factura via tipo_pago_id
  facturas!: factura[];
  getFacturas!: Sequelize.HasManyGetAssociationsMixin<factura>;
  setFacturas!: Sequelize.HasManySetAssociationsMixin<factura, facturaId>;
  addFactura!: Sequelize.HasManyAddAssociationMixin<factura, facturaId>;
  addFacturas!: Sequelize.HasManyAddAssociationsMixin<factura, facturaId>;
  createFactura!: Sequelize.HasManyCreateAssociationMixin<factura>;
  removeFactura!: Sequelize.HasManyRemoveAssociationMixin<factura, facturaId>;
  removeFacturas!: Sequelize.HasManyRemoveAssociationsMixin<factura, facturaId>;
  hasFactura!: Sequelize.HasManyHasAssociationMixin<factura, facturaId>;
  hasFacturas!: Sequelize.HasManyHasAssociationsMixin<factura, facturaId>;
  countFacturas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tipo_pago {
    return tipo_pago.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "nombre_UNIQUE"
    },
    status: {
      type: DataTypes.TINYINT,
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
    tableName: 'tipo_pago',
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
        name: "nombre_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
        ]
      },
    ]
  });
  }
}
