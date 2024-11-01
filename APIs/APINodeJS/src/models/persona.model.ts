import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { persona_rol, persona_rolId } from './persona_rol.model';
import type { rol, rolId } from './rol.model';

export interface personaAttributes {
  id: number;
  nombre: string;
  telefono: number;
  email: string;
  contrasena: string;
  salario: number;
  direccion?: string;
  token?: string;
  status: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type personaPk = "id";
export type personaId = persona[personaPk];
export type personaOptionalAttributes = "id" | "direccion" | "token" | "status" | "fecha_creacion" | "fecha_modificacion";
export type personaCreationAttributes = Optional<personaAttributes, personaOptionalAttributes>;

export class persona extends Model<personaAttributes, personaCreationAttributes> implements personaAttributes {
  id!: number;
  nombre!: string;
  telefono!: number;
  email!: string;
  contrasena!: string;
  salario!: number;
  direccion?: string;
  token?: string;
  status!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // persona hasMany persona_rol via persona_id
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
  // persona belongsToMany rol via persona_id and rol_id
  rol_id_rols!: rol[];
  getRol_id_rols!: Sequelize.BelongsToManyGetAssociationsMixin<rol>;
  setRol_id_rols!: Sequelize.BelongsToManySetAssociationsMixin<rol, rolId>;
  addRol_id_rol!: Sequelize.BelongsToManyAddAssociationMixin<rol, rolId>;
  addRol_id_rols!: Sequelize.BelongsToManyAddAssociationsMixin<rol, rolId>;
  createRol_id_rol!: Sequelize.BelongsToManyCreateAssociationMixin<rol>;
  removeRol_id_rol!: Sequelize.BelongsToManyRemoveAssociationMixin<rol, rolId>;
  removeRol_id_rols!: Sequelize.BelongsToManyRemoveAssociationsMixin<rol, rolId>;
  hasRol_id_rol!: Sequelize.BelongsToManyHasAssociationMixin<rol, rolId>;
  hasRol_id_rols!: Sequelize.BelongsToManyHasAssociationsMixin<rol, rolId>;
  countRol_id_rols!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof persona {
    return persona.init({
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
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    salario: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(30),
      allowNull: true
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
    tableName: 'persona',
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
        name: "token_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token" },
        ]
      },
    ]
  });
  }
}
