import express, { Request, Response } from 'express';
import { producto_categoria, producto_categoriaAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear una nueva relación producto-categoria
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaRelacion = await producto_categoria.create(req.body as producto_categoriaAttributes);
    return res.json(nuevaRelacion);
  } catch (error) {
    console.error('Error al crear una relación producto-categoria:', error);
    return res.status(500).json({ error: 'Error al crear una relación producto-categoria' });
  }
});

// Ruta para obtener todas las relaciones producto-categoria
router.get('/', async (req: Request, res: Response) => {
  try {
    const relaciones = await producto_categoria.findAll();
    return res.json(relaciones);
  } catch (error) {
    console.error('Error al obtener relaciones producto-categoria:', error);
    return res.status(500).json({ error: 'Error al obtener relaciones producto-categoria' });
  }
});

// Ruta para obtener una relación producto-categoria por producto_id y categoria_id
router.get('/:producto_id/:categoria_id', async (req: Request, res: Response) => {
  const { producto_id, categoria_id } = req.params;
  try {
    const relacionEncontrada = await producto_categoria.findOne({
      where: { producto_id, categoria_id },
    });
    if (!relacionEncontrada) {
      return res.status(404).json({ error: 'Relación producto-categoria no encontrada' });
    }
    return res.json(relacionEncontrada);
  } catch (error) {
    console.error('Error al obtener relación producto-categoria por IDs:', error);
    return res.status(500).json({ error: 'Error al obtener relación producto-categoria por IDs' });
  }
});

// Ruta para actualizar una relación producto-categoria por producto_id y categoria_id
router.put('/:producto_id/:categoria_id', async (req: Request, res: Response) => {
  const { producto_id, categoria_id } = req.params;
  try {
    const relacionActualizada = await producto_categoria.findOne({
      where: { producto_id, categoria_id },
    });
    if (!relacionActualizada) {
      return res.status(404).json({ error: 'Relación producto-categoria no encontrada' });
    }
    await relacionActualizada.update(req.body as producto_categoriaAttributes);
    return res.json(relacionActualizada);
  } catch (error) {
    console.error('Error al actualizar relación producto-categoria por IDs:', error);
    return res.status(500).json({ error: 'Error al actualizar relación producto-categoria por IDs' });
  }
});

// Ruta para eliminar una relación producto-categoria por producto_id y categoria_id
router.delete('/:producto_id/:categoria_id', async (req: Request, res: Response) => {
  const { producto_id, categoria_id } = req.params;
  try {
    const relacionEliminada = await producto_categoria.findOne({
      where: { producto_id, categoria_id },
    });
    if (!relacionEliminada) {
      return res.status(404).json({ error: 'Relación producto-categoria no encontrada' });
    }
    await relacionEliminada.destroy();
    return res.json({ message: 'Relación producto-categoria eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar relación producto-categoria por IDs:', error);
    return res.status(500).json({ error: 'Error al eliminar relación producto-categoria por IDs' });
  }
});

export default router;
