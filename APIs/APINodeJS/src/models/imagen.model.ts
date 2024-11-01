import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { producto, productoId } from './producto.model';

export interface imagenAttributes {
  id: number;
  nombre: string;
  url: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  producto_id: number;
}

export type imagenPk = "id";
export type imagenId = imagen[imagenPk];
export type imagenOptionalAttributes = "id" | "fecha_creacion" | "fecha_modificacion";
export type imagenCreationAttributes = Optional<imagenAttributes, imagenOptionalAttributes>;

export class imagen extends Model<imagenAttributes, imagenCreationAttributes> implements imagenAttributes {
  id!: number;
  nombre!: string;
  url!: string;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;
  producto_id!: number;

  // imagen belongsTo producto via producto_id
  producto!: producto;
  getProducto!: Sequelize.BelongsToGetAssociationMixin<producto>;
  setProducto!: Sequelize.BelongsToSetAssociationMixin<producto, productoId>;
  createProducto!: Sequelize.BelongsToCreateAssociationMixin<producto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof imagen {
    return imagen.init({
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
    url: {
      type: DataTypes.STRING(255),
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
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'imagen',
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
        name: "fk_imagen_producto1_idx",
        using: "BTREE",
        fields: [
          { name: "producto_id" },
        ]
      },
    ]
  });
  }
}
