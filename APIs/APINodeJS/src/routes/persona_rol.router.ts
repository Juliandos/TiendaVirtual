import express, { Request, Response } from 'express';
import { persona_rol, persona_rolAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear una nueva relación entre persona y rol
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaRelacionPersonaRol = await persona_rol.create(req.body as persona_rolAttributes);
    return res.json(nuevaRelacionPersonaRol);
  } catch (error) {
    console.error('Error al crear una relación persona-rol:', error);
    return res.status(500).json({ error: 'Error al crear una relación persona-rol' });
  }
});

// Ruta para obtener todas las relaciones persona-rol
router.get('/', async (req: Request, res: Response) => {
  try {
    const relacionesPersonaRol = await persona_rol.findAll();
    return res.json(relacionesPersonaRol);
  } catch (error) {
    console.error('Error al obtener relaciones persona-rol:', error);
    return res.status(500).json({ error: 'Error al obtener relaciones persona-rol' });
  }
});

// Ruta para obtener una relación persona-rol por ID de persona y rol
router.get('/:persona_id', async (req: Request, res: Response) => {
  const { persona_id} = req.params;
  try {
    const relacionEncontrada = await persona_rol.findOne({
      where: { persona_id },
    });
    if (!relacionEncontrada) {
      return res.status(404).json({ error: 'Relación persona-rol no encontrada' });
    }
    return res.json(relacionEncontrada);
  } catch (error) {
    console.error('Error al obtener relación persona-rol por ID:', error);
    return res.status(500).json({ error: 'Error al obtener relación persona-rol por ID' });
  }
});

// Ruta para actualizar una relación persona-rol por ID de persona y rol
router.put('/:persona_id/:rol_id', async (req: Request, res: Response) => {
  const { persona_id, rol_id } = req.params;
  const { persona_id: new_persona_id, rol_id: new_rol_id } = req.body;

  try {
    // Verificar si la relación existente está presente
    const relacionExistente = await persona_rol.findOne({
      where: { persona_id: persona_id, rol_id: rol_id },
    });

    if (!relacionExistente) {
      return res.status(404).json({ error: 'Relación persona-rol no encontrada' });
    }

    // Eliminar la relación existente
    await persona_rol.destroy({
      where: { persona_id: persona_id, rol_id: rol_id }
    });

    // Crear una nueva relación con los valores actualizados
    await persona_rol.create({
      persona_id: new_persona_id,
      rol_id: new_rol_id,
      fecha_creacion: relacionExistente.fecha_creacion, // Mantener la fecha de creación original
      fecha_modificacion: new Date() // Actualizar la fecha de modificación
    });

    return res.json({ message: 'Relación persona-rol actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar relación persona-rol:', error);
    return res.status(500).json({ error: 'Error al actualizar relación persona-rol' });
  }
});

// Ruta para eliminar una relación persona-rol por ID de persona y rol
router.delete('/:persona_id/:rol_id', async (req: Request, res: Response) => {
  const { persona_id, rol_id } = req.params;
  try {
    const relacionEliminada = await persona_rol.findOne({
      where: { persona_id, rol_id },
    });
    if (!relacionEliminada) {
      return res.status(404).json({ error: 'Relación persona-rol no encontrada' });
    }
    await relacionEliminada.destroy();
    return res.json({ message: 'Relación persona-rol eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar relación persona-rol por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar relación persona-rol por ID' });
  }
});

export default router;
