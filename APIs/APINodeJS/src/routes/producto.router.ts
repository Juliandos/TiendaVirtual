import express, { Request, Response } from 'express';
import { producto, productoAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

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

export default router;
