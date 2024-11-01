import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categoria, categoriaId } from './categoria.model';
import type { producto, productoId } from './producto.model';

export interface producto_categoriaAttributes {
  producto_id: number;
  categoria_id: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type producto_categoriaPk = "producto_id" | "categoria_id";
export type producto_categoriaId = producto_categoria[producto_categoriaPk];
export type producto_categoriaOptionalAttributes = "fecha_creacion" | "fecha_modificacion";
export type producto_categoriaCreationAttributes = Optional<producto_categoriaAttributes, producto_categoriaOptionalAttributes>;

export class producto_categoria extends Model<producto_categoriaAttributes, producto_categoriaCreationAttributes> implements producto_categoriaAttributes {
  producto_id!: number;
  categoria_id!: number;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // producto_categoria belongsTo categoria via categoria_id
  categorium!: categoria;
  getCategorium!: Sequelize.BelongsToGetAssociationMixin<categoria>;
  setCategorium!: Sequelize.BelongsToSetAssociationMixin<categoria, categoriaId>;
  createCategorium!: Sequelize.BelongsToCreateAssociationMixin<categoria>;
  // producto_categoria belongsTo producto via producto_id
  producto!: producto;
  getProducto!: Sequelize.BelongsToGetAssociationMixin<producto>;
  setProducto!: Sequelize.BelongsToSetAssociationMixin<producto, productoId>;
  createProducto!: Sequelize.BelongsToCreateAssociationMixin<producto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof producto_categoria {
    return producto_categoria.init({
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producto',
        key: 'id'
      }
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categoria',
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
    tableName: 'producto_categoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "producto_id" },
          { name: "categoria_id" },
        ]
      },
      {
        name: "fk_producto_has_categoria_categoria1_idx",
        using: "BTREE",
        fields: [
          { name: "categoria_id" },
        ]
      },
      {
        name: "fk_producto_has_categoria_producto1_idx",
        using: "BTREE",
        fields: [
          { name: "producto_id" },
        ]
      },
    ]
  });
  }
}
