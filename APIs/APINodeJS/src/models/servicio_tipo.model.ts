import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { factura, facturaId } from './factura.model';

export interface servicio_tipoAttributes {
  id: number;
  nombre: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type servicio_tipoPk = "id";
export type servicio_tipoId = servicio_tipo[servicio_tipoPk];
export type servicio_tipoOptionalAttributes = "id" | "fecha_creacion" | "fecha_modificacion";
export type servicio_tipoCreationAttributes = Optional<servicio_tipoAttributes, servicio_tipoOptionalAttributes>;

export class servicio_tipo extends Model<servicio_tipoAttributes, servicio_tipoCreationAttributes> implements servicio_tipoAttributes {
  id!: number;
  nombre!: string;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // servicio_tipo hasMany factura via servicio_tipo_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof servicio_tipo {
    return servicio_tipo.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "nombre_UNIQUE"
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
    tableName: 'servicio_tipo',
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
