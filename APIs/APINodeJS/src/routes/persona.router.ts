import express, { Request, Response } from 'express';
import { persona, personaAttributes } from '../models/init-models.model';

const router = express.Router();

// Ruta para buscar una persona por correo electrónico
router.post('/login', async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const personaEncontrada = await persona.findOne({ where: { email } });
    if (!personaEncontrada) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    return res.json(personaEncontrada);
  } catch (error) {
    console.error('Error al buscar persona por correo electrónico:', error);
    return res.status(500).json({ error: 'Error al buscar persona por correo electrónico' });
  }
});

// Ruta para crear una nueva persona
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaPersona = await persona.create(req.body as personaAttributes);
    return res.json(nuevaPersona);
  } catch (error) {
    console.error('Error al crear una persona:', error);
    return res.status(500).json({ error: 'Error al crear una persona' });
  }
});

// Ruta para obtener todas las personas
router.get('/', async (req: Request, res: Response) => {
  try {
    const personas = await persona.findAll();
    return res.json(personas);
  } catch (error) {
    console.error('Error al obtener personas:', error);
    return res.status(500).json({ error: 'Error al obtener personas' });
  }
});

// Ruta para obtener una persona por ID
router.get('/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const personaEncontrada = await persona.findOne({ where: { email } });
    if (!personaEncontrada) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    return res.json(personaEncontrada);
  } catch (error) {
    console.error('Error al obtener persona por ID:', error);
    return res.status(500).json({ error: 'Error al obtener persona por ID' });
  }
});

// Ruta para actualizar una persona por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const personaActualizada = await persona.findByPk(id);
    if (!personaActualizada) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    await personaActualizada.update(req.body as personaAttributes);
    return res.json(personaActualizada);
  } catch (error) {
    console.error('Error al actualizar persona por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar persona por ID' });
  }
});

// Ruta para eliminar una persona por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const personaEliminada = await persona.findByPk(id);
    if (!personaEliminada) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    await personaEliminada.destroy();
    return res.json({ message: 'Persona eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar persona por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar persona por ID' });
  }
});

export default router;
