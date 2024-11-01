import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { persona, personaId } from './persona.model';
import type { rol, rolId } from './rol.model';

export interface persona_rolAttributes {
  persona_id: number;
  rol_id: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type persona_rolPk = "persona_id" | "rol_id";
export type persona_rolId = persona_rol[persona_rolPk];
export type persona_rolOptionalAttributes = "fecha_creacion" | "fecha_modificacion";
export type persona_rolCreationAttributes = Optional<persona_rolAttributes, persona_rolOptionalAttributes>;

export class persona_rol extends Model<persona_rolAttributes, persona_rolCreationAttributes> implements persona_rolAttributes {
  persona_id!: number;
  rol_id!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // persona_rol belongsTo persona via persona_id
  persona!: persona;
  getPersona!: Sequelize.BelongsToGetAssociationMixin<persona>;
  setPersona!: Sequelize.BelongsToSetAssociationMixin<persona, personaId>;
  createPersona!: Sequelize.BelongsToCreateAssociationMixin<persona>;
  // persona_rol belongsTo rol via rol_id
  rol!: rol;
  getRol!: Sequelize.BelongsToGetAssociationMixin<rol>;
  setRol!: Sequelize.BelongsToSetAssociationMixin<rol, rolId>;
  createRol!: Sequelize.BelongsToCreateAssociationMixin<rol>;

  static initModel(sequelize: Sequelize.Sequelize): typeof persona_rol {
    return persona_rol.init({
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'persona',
        key: 'id'
      }
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rol',
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
    tableName: 'persona_rol',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "persona_id" },
          { name: "rol_id" },
        ]
      },
      {
        name: "fk_persona_has_rol_rol1_idx",
        using: "BTREE",
        fields: [
          { name: "rol_id" },
        ]
      },
      {
        name: "fk_persona_has_rol_persona1_idx",
        using: "BTREE",
        fields: [
          { name: "persona_id" },
        ]
      },
    ]
  });
  }
}
