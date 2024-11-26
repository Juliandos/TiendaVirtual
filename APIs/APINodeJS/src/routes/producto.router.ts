import express, { Request, Response } from 'express';
import { producto, productoAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta
import { Sequelize } from 'sequelize';

const router = express.Router();

// Ruta para crear un nuevo producto
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoProducto = await producto.create(req.body as productoAttributes);
    return res.json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear un producto:', error);
    return res.status(500).json({ error: 'Error al crear un producto' });
  }
});

// Ruta para obtener todos los productos
router.get('/', async (req: Request, res: Response) => {
  try {
    const productos = await producto.findAll();
    return res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoEncontrado = await producto.findByPk(Number(id));
    if (!productoEncontrado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.json(productoEncontrado);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    return res.status(500).json({ error: 'Error al obtener producto por ID' });
  }
});

// Ruta para actualizar un producto por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoActualizado = await producto.findByPk(Number(id));
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await productoActualizado.update(req.body as productoAttributes);
    return res.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar producto por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar producto por ID' });
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoEliminado = await producto.findByPk(Number(id));
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await productoEliminado.destroy();
    return res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar producto por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar producto por ID' });
  }
});

router.post('/producto', async (req: Request, res: Response) => {
  try {
    const { producto_id } = req.body;

    const query = `
      SELECT 
        p.id AS producto_id,
        p.nombre AS producto_nombre,
        p.referencia,
        p.descripcion,
        p.marca,
        p.cantidad_minima,
        p.cantidad_actual,
        p.precio_compra,
        p.precio_venta,
        p.fecha_creacion AS producto_fecha_creacion,
        p.fecha_modificacion AS producto_fecha_modificacion,
        i.nombre AS imagen_nombre,
        i.url AS imagen_url
      FROM producto p
      LEFT JOIN imagen i ON p.id = i.producto_id
      WHERE p.id = '${producto_id}';
    `;

    // Obtener instancia de Sequelize
    const sequelize: Sequelize | undefined = producto.sequelize;

    if (!sequelize) {
      throw new Error('No es posible obtener la referencia al objeto Sequelize');
    }

    // Ejecutar la consulta
    const [result]: any = await sequelize.query(query);

    // Retornar la información del producto
    return res.json(result);
  } catch (error) {
    console.error('Error al obtener información del producto:', error);
    return res.status(500).json({ error: 'Error al obtener información del producto' });
  }
});

export default router;
