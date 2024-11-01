import express, { Request, Response } from 'express';
import { modulo, moduloAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear un nuevo módulo
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoModulo = await modulo.create(req.body as moduloAttributes);
    return res.json(nuevoModulo);
  } catch (error) {
    console.error('Error al crear un módulo:', error);
    return res.status(500).json({ error: 'Error al crear un módulo' });
  }
});

// Ruta para obtener todos los módulos
router.get('/', async (req: Request, res: Response) => {
  try {
    const modulos = await modulo.findAll();
    return res.json(modulos);
  } catch (error) {
    console.error('Error al obtener módulos:', error);
    return res.status(500).json({ error: 'Error al obtener módulos' });
  }
});

// Ruta para obtener un módulo por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const moduloEncontrado = await modulo.findByPk(Number(id));
    if (!moduloEncontrado) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }
    return res.json(moduloEncontrado);
  } catch (error) {
    console.error('Error al obtener módulo por ID:', error);
    return res.status(500).json({ error: 'Error al obtener módulo por ID' });
  }
});

// Ruta para actualizar un módulo por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const moduloActualizado = await modulo.findByPk(Number(id));
    if (!moduloActualizado) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }
    await moduloActualizado.update(req.body as moduloAttributes);
    return res.json(moduloActualizado);
  } catch (error) {
    console.error('Error al actualizar módulo por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar módulo por ID' });
  }
});

// Ruta para eliminar un módulo por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const moduloEliminado = await modulo.findByPk(Number(id));
    if (!moduloEliminado) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }
    await moduloEliminado.destroy();
    return res.json({ message: 'Módulo eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar módulo por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar módulo por ID' });
  }
});

export default router;
