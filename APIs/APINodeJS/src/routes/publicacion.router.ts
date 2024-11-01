import express, { Request, Response } from 'express';
import { publicacion, publicacionAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear una nueva publicación
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaPublicacion = await publicacion.create(req.body as publicacionAttributes);
    return res.json(nuevaPublicacion);
  } catch (error) {
    console.error('Error al crear una publicación:', error);
    return res.status(500).json({ error: 'Error al crear una publicación' });
  }
});

// Ruta para obtener todas las publicaciones
router.get('/', async (req: Request, res: Response) => {
  try {
    const publicaciones = await publicacion.findAll();
    return res.json(publicaciones);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    return res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
});

// Ruta para obtener una publicación por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const publicacionEncontrada = await publicacion.findByPk(Number(id));
    if (!publicacionEncontrada) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    return res.json(publicacionEncontrada);
  } catch (error) {
    console.error('Error al obtener publicación por ID:', error);
    return res.status(500).json({ error: 'Error al obtener publicación por ID' });
  }
});

// Ruta para actualizar una publicación por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const publicacionActualizada = await publicacion.findByPk(Number(id));
    if (!publicacionActualizada) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    await publicacionActualizada.update(req.body as publicacionAttributes);
    return res.json(publicacionActualizada);
  } catch (error) {
    console.error('Error al actualizar publicación por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar publicación por ID' });
  }
});

// Ruta para eliminar una publicación por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const publicacionEliminada = await publicacion.findByPk(Number(id));
    if (!publicacionEliminada) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    await publicacionEliminada.destroy();
    return res.json({ message: 'Publicación eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar publicación por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar publicación por ID' });
  }
});

export default router;
