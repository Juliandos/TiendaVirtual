import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permisos, permisosId } from './permisos.model';
import type { rol, rolId } from './rol.model';

export interface rol_permisosAttributes {
  rol_id: number;
  permisos_id: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type rol_permisosPk = "rol_id" | "permisos_id";
export type rol_permisosId = rol_permisos[rol_permisosPk];
export type rol_permisosOptionalAttributes = "fecha_creacion" | "fecha_modificacion";
export type rol_permisosCreationAttributes = Optional<rol_permisosAttributes, rol_permisosOptionalAttributes>;

export class rol_permisos extends Model<rol_permisosAttributes, rol_permisosCreationAttributes> implements rol_permisosAttributes {
  rol_id!: number;
  permisos_id!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // rol_permisos belongsTo permisos via permisos_id
  permiso!: permisos;
  getPermiso!: Sequelize.BelongsToGetAssociationMixin<permisos>;
  setPermiso!: Sequelize.BelongsToSetAssociationMixin<permisos, permisosId>;
  createPermiso!: Sequelize.BelongsToCreateAssociationMixin<permisos>;
  // rol_permisos belongsTo rol via rol_id
  rol!: rol;
  getRol!: Sequelize.BelongsToGetAssociationMixin<rol>;
  setRol!: Sequelize.BelongsToSetAssociationMixin<rol, rolId>;
  createRol!: Sequelize.BelongsToCreateAssociationMixin<rol>;

  static initModel(sequelize: Sequelize.Sequelize): typeof rol_permisos {
    return rol_permisos.init({
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rol',
        key: 'id'
      }
    },
    permisos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permisos',
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
    tableName: 'rol_permisos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rol_id" },
          { name: "permisos_id" },
        ]
      },
      {
        name: "fk_rol_has_permisos_permisos1_idx",
        using: "BTREE",
        fields: [
          { name: "permisos_id" },
        ]
      },
      {
        name: "fk_rol_has_permisos_rol1_idx",
        using: "BTREE",
        fields: [
          { name: "rol_id" },
        ]
      },
    ]
  });
  }
}
