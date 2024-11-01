import express, { Request, Response } from 'express';
import { imagen, imagenAttributes } from '../models/init-models.model';

const router = express.Router();

// Ruta para crear una nueva imagen
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaImagen = await imagen.create(req.body as imagenAttributes);
    return res.json(nuevaImagen);
  } catch (error) {
    console.error('Error al crear una imagen:', error);
    return res.status(500).json({ error: 'Error al crear una imagen' });
  }
});

// Ruta para obtener todas las imágenes
router.get('/', async (req: Request, res: Response) => {
  try {
    const imagenes = await imagen.findAll();
    return res.json(imagenes);
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return res.status(500).json({ error: 'Error al obtener imágenes' });
  }
});

// Ruta para obtener una imagen por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const imagenEncontrada = await imagen.findByPk(Number(id));
    if (!imagenEncontrada) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    return res.json(imagenEncontrada);
  } catch (error) {
    console.error('Error al obtener imagen por ID:', error);
    return res.status(500).json({ error: 'Error al obtener imagen por ID' });
  }
});

// Ruta para actualizar una imagen por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const imagenActualizada = await imagen.findByPk(Number(id));
    if (!imagenActualizada) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    await imagenActualizada.update(req.body as imagenAttributes);
    return res.json(imagenActualizada);
  } catch (error) {
    console.error('Error al actualizar imagen por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar imagen por ID' });
  }
});

// Ruta para eliminar una imagen por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const imagenEliminada = await imagen.findByPk(Number(id));
    if (!imagenEliminada) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    await imagenEliminada.destroy();
    return res.json({ message: 'Imagen eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar imagen por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar imagen por ID' });
  }
});

export default router;
