import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface contactoAttributes {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type contactoPk = "id";
export type contactoId = contacto[contactoPk];
export type contactoOptionalAttributes = "id" | "fecha_creacion" | "fecha_modificacion";
export type contactoCreationAttributes = Optional<contactoAttributes, contactoOptionalAttributes>;

export class contacto extends Model<contactoAttributes, contactoCreationAttributes> implements contactoAttributes {
  id!: number;
  nombre!: string;
  email!: string;
  mensaje!: string;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof contacto {
    return contacto.init({
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
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    mensaje: {
      type: DataTypes.TEXT,
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
    tableName: 'contacto',
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
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
