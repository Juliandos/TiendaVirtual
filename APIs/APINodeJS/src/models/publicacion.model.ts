import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface publicacionAttributes {
  id: number;
  titulo: string;
  contenido: string;
  portada: string;
  status: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type publicacionPk = "id";
export type publicacionId = publicacion[publicacionPk];
export type publicacionOptionalAttributes = "id" | "status" | "fecha_creacion" | "fecha_modificacion";
export type publicacionCreationAttributes = Optional<publicacionAttributes, publicacionOptionalAttributes>;

export class publicacion extends Model<publicacionAttributes, publicacionCreationAttributes> implements publicacionAttributes {
  id!: number;
  titulo!: string;
  contenido!: string;
  portada!: string;
  status!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof publicacion {
    return publicacion.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "titulo_UNIQUE"
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    portada: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'publicacion',
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
        name: "titulo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "titulo" },
        ]
      },
    ]
  });
  }
}
