import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permisos, permisosId } from './permisos.model';
import type { persona, personaId } from './persona.model';
import type { persona_rol, persona_rolId } from './persona_rol.model';
import type { rol_permisos, rol_permisosId } from './rol_permisos.model';

export interface rolAttributes {
  id: number;
  nombre: string;
  descripcion: string;
  status: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type rolPk = "id";
export type rolId = rol[rolPk];
export type rolOptionalAttributes = "id" | "status" | "fecha_creacion" | "fecha_modificacion";
export type rolCreationAttributes = Optional<rolAttributes, rolOptionalAttributes>;

export class rol extends Model<rolAttributes, rolCreationAttributes> implements rolAttributes {
  id!: number;
  nombre!: string;
  descripcion!: string;
  status!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // rol belongsToMany permisos via rol_id and permisos_id
  permisos_id_permisos!: permisos[];
  getPermisos_id_permisos!: Sequelize.BelongsToManyGetAssociationsMixin<permisos>;
  setPermisos_id_permisos!: Sequelize.BelongsToManySetAssociationsMixin<permisos, permisosId>;
  addPermisos_id_permiso!: Sequelize.BelongsToManyAddAssociationMixin<permisos, permisosId>;
  addPermisos_id_permisos!: Sequelize.BelongsToManyAddAssociationsMixin<permisos, permisosId>;
  createPermisos_id_permiso!: Sequelize.BelongsToManyCreateAssociationMixin<permisos>;
  removePermisos_id_permiso!: Sequelize.BelongsToManyRemoveAssociationMixin<permisos, permisosId>;
  removePermisos_id_permisos!: Sequelize.BelongsToManyRemoveAssociationsMixin<permisos, permisosId>;
  hasPermisos_id_permiso!: Sequelize.BelongsToManyHasAssociationMixin<permisos, permisosId>;
  hasPermisos_id_permisos!: Sequelize.BelongsToManyHasAssociationsMixin<permisos, permisosId>;
  countPermisos_id_permisos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // rol belongsToMany persona via rol_id and persona_id
  persona_id_personas!: persona[];
  getPersona_id_personas!: Sequelize.BelongsToManyGetAssociationsMixin<persona>;
  setPersona_id_personas!: Sequelize.BelongsToManySetAssociationsMixin<persona, personaId>;
  addPersona_id_persona!: Sequelize.BelongsToManyAddAssociationMixin<persona, personaId>;
  addPersona_id_personas!: Sequelize.BelongsToManyAddAssociationsMixin<persona, personaId>;
  createPersona_id_persona!: Sequelize.BelongsToManyCreateAssociationMixin<persona>;
  removePersona_id_persona!: Sequelize.BelongsToManyRemoveAssociationMixin<persona, personaId>;
  removePersona_id_personas!: Sequelize.BelongsToManyRemoveAssociationsMixin<persona, personaId>;
  hasPersona_id_persona!: Sequelize.BelongsToManyHasAssociationMixin<persona, personaId>;
  hasPersona_id_personas!: Sequelize.BelongsToManyHasAssociationsMixin<persona, personaId>;
  countPersona_id_personas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // rol hasMany persona_rol via rol_id
  persona_rols!: persona_rol[];
  getPersona_rols!: Sequelize.HasManyGetAssociationsMixin<persona_rol>;
  setPersona_rols!: Sequelize.HasManySetAssociationsMixin<persona_rol, persona_rolId>;
  addPersona_rol!: Sequelize.HasManyAddAssociationMixin<persona_rol, persona_rolId>;
  addPersona_rols!: Sequelize.HasManyAddAssociationsMixin<persona_rol, persona_rolId>;
  createPersona_rol!: Sequelize.HasManyCreateAssociationMixin<persona_rol>;
  removePersona_rol!: Sequelize.HasManyRemoveAssociationMixin<persona_rol, persona_rolId>;
  removePersona_rols!: Sequelize.HasManyRemoveAssociationsMixin<persona_rol, persona_rolId>;
  hasPersona_rol!: Sequelize.HasManyHasAssociationMixin<persona_rol, persona_rolId>;
  hasPersona_rols!: Sequelize.HasManyHasAssociationsMixin<persona_rol, persona_rolId>;
  countPersona_rols!: Sequelize.HasManyCountAssociationsMixin;
  // rol hasMany rol_permisos via rol_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof rol {
    return rol.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
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
    tableName: 'rol',
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
    ]
  });
  }
}
