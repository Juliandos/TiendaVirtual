import express, { Request, Response } from 'express';
import { rol, rolAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear un nuevo rol
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoRol = await rol.create(req.body as rolAttributes);
    return res.json(nuevoRol);
  } catch (error) {
    console.error('Error al crear un rol:', error);
    return res.status(500).json({ error: 'Error al crear un rol' });
  }
});

// Ruta para obtener todos los roles
router.get('/', async (req: Request, res: Response) => {
  try {
    const roles = await rol.findAll();
    return res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    return res.status(500).json({ error: 'Error al obtener roles' });
  }
});

// Ruta para obtener un rol por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rolEncontrado = await rol.findByPk(Number(id));
    if (!rolEncontrado) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    return res.json(rolEncontrado);
  } catch (error) {
    console.error('Error al obtener rol por ID:', error);
    return res.status(500).json({ error: 'Error al obtener rol por ID' });
  }
});

// Ruta para actualizar un rol por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rolActualizado = await rol.findByPk(Number(id));
    if (!rolActualizado) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    await rolActualizado.update(req.body as rolAttributes);
    return res.json(rolActualizado);
  } catch (error) {
    console.error('Error al actualizar rol por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar rol por ID' });
  }
});

// Ruta para eliminar un rol por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rolEliminado = await rol.findByPk(Number(id));
    if (!rolEliminado) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    await rolEliminado.destroy();
    return res.json({ message: 'Rol eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar rol por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar rol por ID' });
  }
});

export default router;
