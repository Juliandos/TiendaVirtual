import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { modulo, moduloId } from './modulo.model';
import type { rol, rolId } from './rol.model';
import type { rol_permisos, rol_permisosId } from './rol_permisos.model';

export interface permisosAttributes {
  id: number;
  r: boolean;
  w: boolean;
  u: boolean;
  d: boolean;
  rol: string;
  modulo_id: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type permisosPk = "id";
export type permisosId = permisos[permisosPk];
export type permisosOptionalAttributes = "id" | "fecha_creacion" | "fecha_modificacion";
export type permisosCreationAttributes = Optional<permisosAttributes, permisosOptionalAttributes>;

export class permisos extends Model<permisosAttributes, permisosCreationAttributes> implements permisosAttributes {
  id!: number;
  r!: boolean;
  w!: boolean;
  u!: boolean;
  d!: boolean;
  rol!:string;
  modulo_id!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // permisos belongsTo modulo via modulo_id
  modulo!: modulo;
  getModulo!: Sequelize.BelongsToGetAssociationMixin<modulo>;
  setModulo!: Sequelize.BelongsToSetAssociationMixin<modulo, moduloId>;
  createModulo!: Sequelize.BelongsToCreateAssociationMixin<modulo>;
  // permisos belongsToMany rol via permisos_id and rol_id
  rol_id_rol_rol_permisos!: rol[];
  getRol_id_rol_rol_permisos!: Sequelize.BelongsToManyGetAssociationsMixin<rol>;
  setRol_id_rol_rol_permisos!: Sequelize.BelongsToManySetAssociationsMixin<rol, rolId>;
  addRol_id_rol_rol_permiso!: Sequelize.BelongsToManyAddAssociationMixin<rol, rolId>;
  addRol_id_rol_rol_permisos!: Sequelize.BelongsToManyAddAssociationsMixin<rol, rolId>;
  createRol_id_rol_rol_permiso!: Sequelize.BelongsToManyCreateAssociationMixin<rol>;
  removeRol_id_rol_rol_permiso!: Sequelize.BelongsToManyRemoveAssociationMixin<rol, rolId>;
  removeRol_id_rol_rol_permisos!: Sequelize.BelongsToManyRemoveAssociationsMixin<rol, rolId>;
  hasRol_id_rol_rol_permiso!: Sequelize.BelongsToManyHasAssociationMixin<rol, rolId>;
  hasRol_id_rol_rol_permisos!: Sequelize.BelongsToManyHasAssociationsMixin<rol, rolId>;
  countRol_id_rol_rol_permisos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // permisos hasMany rol_permisos via permisos_id
  rol_permisos!: rol_permisos[];
  getRol_permisos!: Sequelize.HasManyGetAssociationsMixin<rol_permisos>;
  setRol_permisos!: Sequelize.HasManySetAssociationsMixin<rol_permisos, rol_permisosId>;
  addRol_permiso!: Sequelize.HasManyAddAssociationMixin<rol_permisos, rol_permisosId>;
  addRol_permisos!: Sequelize.HasManyAddAssociationsMixin<rol_permisos, rol_permisosId>;
  createRol_permiso!: Sequelize.HasManyCreateAssociationMixin<rol_permisos>;
  removeRol_permiso!: Sequelize.HasManyRemoveAssociationMixin<rol_permisos, rol_permisosId>;
  removeRol_permisos!: Sequelize.HasManyRemoveAssociationsMixin<rol_permisos, rol_permisosId>;
  hasRol_permiso!: Sequelize.HasManyHasAssociationMixin<rol_permisos, rol_permisosId>;
  hasRol_permisos!: Sequelize.HasManyHasAssociationsMixin<rol_permisos, rol_permisosId>;
  countRol_permisos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof permisos {
    return permisos.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    w: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    u: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    d: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modulo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modulo',
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
    tableName: 'permisos',
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
        name: "fk_permisos_modulo1_idx",
        using: "BTREE",
        fields: [
          { name: "modulo_id" },
        ]
      },
    ]
  });
  }
}
