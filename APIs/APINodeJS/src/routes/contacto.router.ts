import express, { Request, Response } from 'express';
import { contacto, contactoAttributes } from '../models/init-models.model';

const router = express.Router();

// Ruta para crear un nuevo contacto
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoContacto = await contacto.create(req.body as contactoAttributes);
    return res.json(nuevoContacto);
  } catch (error) {
    console.error('Error al crear un contacto:', error);
    return res.status(500).json({ error: 'Error al crear un contacto' });
  }
});

// Ruta para obtener todos los contactos
router.get('/', async (req: Request, res: Response) => {
  try {
    const contactos = await contacto.findAll();
    return res.json(contactos);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    return res.status(500).json({ error: 'Error al obtener contactos' });
  }
});

// Ruta para obtener un contacto por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contactoEncontrado = await contacto.findByPk(Number(id));
    if (!contactoEncontrado) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    return res.json(contactoEncontrado);
  } catch (error) {
    console.error('Error al obtener contacto por ID:', error);
    return res.status(500).json({ error: 'Error al obtener contacto por ID' });
  }
});

// Ruta para actualizar un contacto por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contactoActualizado = await contacto.findByPk(Number(id));
    if (!contactoActualizado) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    await contactoActualizado.update(req.body as contactoAttributes);
    return res.json(contactoActualizado);
  } catch (error) {
    console.error('Error al actualizar contacto por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar contacto por ID' });
  }
});

// Ruta para eliminar un contacto por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contactoEliminado = await contacto.findByPk(Number(id));
    if (!contactoEliminado) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    await contactoEliminado.destroy();
    return res.json({ message: 'Contacto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar contacto por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar contacto por ID' });
  }
});

export default router;
