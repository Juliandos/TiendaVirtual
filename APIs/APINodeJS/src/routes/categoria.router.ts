import express, { Request, Response } from 'express';
import { categoria, categoriaAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear una nueva categoría
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaCategoria = await categoria.create(req.body as categoriaAttributes);
    return res.json(nuevaCategoria);
  } catch (error) {
    console.error('Error al crear una categoría:', error);
    return res.status(500).json({ error: 'Error al crear una categoría' });
  }
});

// Ruta para obtener todas las categorías
router.get('/', async (req: Request, res: Response) => {
  try {
    const categorias = await categoria.findAll();
    return res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Ruta para obtener una categoría por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoriaEncontrada = await categoria.findByPk(Number(id));
    if (!categoriaEncontrada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    return res.json(categoriaEncontrada);
  } catch (error) {
    console.error('Error al obtener categoría por ID:', error);
    return res.status(500).json({ error: 'Error al obtener categoría por ID' });
  }
});

// Ruta para actualizar una categoría por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoriaActualizada = await categoria.findByPk(Number(id));
    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    await categoriaActualizada.update(req.body as categoriaAttributes);
    return res.json(categoriaActualizada);
  } catch (error) {
    console.error('Error al actualizar categoría por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar categoría por ID' });
  }
});

// Ruta para eliminar una categoría por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoriaEliminada = await categoria.findByPk(Number(id));
    if (!categoriaEliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    await categoriaEliminada.destroy();
    console.log('Sí se eliminó')
    return res.json({ message: 'Categoría eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar categoría por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar categoría por ID' });
  }
});

export default router;
