import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { producto, productoId } from './producto.model';
import type { producto_categoria, producto_categoriaId } from './producto_categoria.model';

export interface categoriaAttributes {
  id: number;
  nombre: string;
  descripcion: string;
  estado: Number;
  portada: String;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export type categoriaPk = "id";
export type categoriaId = categoria[categoriaPk];
export type categoriaOptionalAttributes = "id" | "fecha_creacion" | "fecha_modificacion";
export type categoriaCreationAttributes = Optional<categoriaAttributes, categoriaOptionalAttributes>;

export class categoria extends Model<categoriaAttributes, categoriaCreationAttributes> implements categoriaAttributes {
  id!: number;
  nombre!: string;
  descripcion!: string;
  estado!: Number;
  portada!: String;
  fecha_creacion!: Date;
  fecha_modificacion!: Date;

  // categoria belongsToMany producto via categoria_id and producto_id
  producto_id_producto_producto_categoria!: producto[];
  getProducto_id_producto_producto_categoria!: Sequelize.BelongsToManyGetAssociationsMixin<producto>;
  setProducto_id_producto_producto_categoria!: Sequelize.BelongsToManySetAssociationsMixin<producto, productoId>;
  addProducto_id_producto_producto_categorium!: Sequelize.BelongsToManyAddAssociationMixin<producto, productoId>;
  addProducto_id_producto_producto_categoria!: Sequelize.BelongsToManyAddAssociationsMixin<producto, productoId>;
  createProducto_id_producto_producto_categorium!: Sequelize.BelongsToManyCreateAssociationMixin<producto>;
  removeProducto_id_producto_producto_categorium!: Sequelize.BelongsToManyRemoveAssociationMixin<producto, productoId>;
  removeProducto_id_producto_producto_categoria!: Sequelize.BelongsToManyRemoveAssociationsMixin<producto, productoId>;
  hasProducto_id_producto_producto_categorium!: Sequelize.BelongsToManyHasAssociationMixin<producto, productoId>;
  hasProducto_id_producto_producto_categoria!: Sequelize.BelongsToManyHasAssociationsMixin<producto, productoId>;
  countProducto_id_producto_producto_categoria!: Sequelize.BelongsToManyCountAssociationsMixin;
  // categoria hasMany producto_categoria via categoria_id
  producto_categoria!: producto_categoria[];
  getProducto_categoria!: Sequelize.HasManyGetAssociationsMixin<producto_categoria>;
  setProducto_categoria!: Sequelize.HasManySetAssociationsMixin<producto_categoria, producto_categoriaId>;
  addProducto_categorium!: Sequelize.HasManyAddAssociationMixin<producto_categoria, producto_categoriaId>;
  addProducto_categoria!: Sequelize.HasManyAddAssociationsMixin<producto_categoria, producto_categoriaId>;
  createProducto_categorium!: Sequelize.HasManyCreateAssociationMixin<producto_categoria>;
  removeProducto_categorium!: Sequelize.HasManyRemoveAssociationMixin<producto_categoria, producto_categoriaId>;
  removeProducto_categoria!: Sequelize.HasManyRemoveAssociationsMixin<producto_categoria, producto_categoriaId>;
  hasProducto_categorium!: Sequelize.HasManyHasAssociationMixin<producto_categoria, producto_categoriaId>;
  hasProducto_categoria!: Sequelize.HasManyHasAssociationsMixin<producto_categoria, producto_categoriaId>;
  countProducto_categoria!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof categoria {
    return categoria.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "nombre_UNIQUE"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    portada: {
      type: DataTypes.STRING(100),
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
    tableName: 'categoria',
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
