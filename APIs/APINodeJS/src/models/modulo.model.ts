import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permisos, permisosId } from './permisos.model';

export interface moduloAttributes {
  id: number;
  nombre: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type moduloPk = "id";
export type moduloId = modulo[moduloPk];
export type moduloOptionalAttributes = "id" | "fecha_creacion" | "fecha_modificacion";
export type moduloCreationAttributes = Optional<moduloAttributes, moduloOptionalAttributes>;

export class modulo extends Model<moduloAttributes, moduloCreationAttributes> implements moduloAttributes {
  id!: number;
  nombre!: string;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // modulo hasMany permisos via modulo_id
  permisos!: permisos[];
  getPermisos!: Sequelize.HasManyGetAssociationsMixin<permisos>;
  setPermisos!: Sequelize.HasManySetAssociationsMixin<permisos, permisosId>;
  addPermiso!: Sequelize.HasManyAddAssociationMixin<permisos, permisosId>;
  addPermisos!: Sequelize.HasManyAddAssociationsMixin<permisos, permisosId>;
  createPermiso!: Sequelize.HasManyCreateAssociationMixin<permisos>;
  removePermiso!: Sequelize.HasManyRemoveAssociationMixin<permisos, permisosId>;
  removePermisos!: Sequelize.HasManyRemoveAssociationsMixin<permisos, permisosId>;
  hasPermiso!: Sequelize.HasManyHasAssociationMixin<permisos, permisosId>;
  hasPermisos!: Sequelize.HasManyHasAssociationsMixin<permisos, permisosId>;
  countPermisos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof modulo {
    return modulo.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
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
    tableName: 'modulo',
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
