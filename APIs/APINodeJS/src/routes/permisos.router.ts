import express, { Request, Response } from 'express';
import { permisos, permisosAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear un nuevo permiso
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoPermiso = await permisos.create(req.body as permisosAttributes);
    return res.json(nuevoPermiso);
  } catch (error) {
    console.error('Error al crear un permiso:', error);
    return res.status(500).json({ error: 'Error al crear un permiso' });
  }
});

// Ruta para obtener todos los permisos
router.get('/', async (req: Request, res: Response) => {
  try {
    const permisosLista = await permisos.findAll();
    return res.json(permisosLista);
  } catch (error) {
    console.error('Error al obtener permisos:', error);
    return res.status(500).json({ error: 'Error al obtener permisos' });
  }
});

// Ruta para obtener un permiso por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const permisoEncontrado = await permisos.findByPk(Number(id));
    if (!permisoEncontrado) {
      return res.status(404).json({ error: 'Permiso no encontrado' });
    }
    return res.json(permisoEncontrado);
  } catch (error) {
    console.error('Error al obtener permiso por ID:', error);
    return res.status(500).json({ error: 'Error al obtener permiso por ID' });
  }
});

// Ruta para actualizar un permiso por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const permisoActualizado = await permisos.findByPk(Number(id));
    if (!permisoActualizado) {
      return res.status(404).json({ error: 'Permiso no encontrado' });
    }
    await permisoActualizado.update(req.body as permisosAttributes);
    return res.json(permisoActualizado);
  } catch (error) {
    console.error('Error al actualizar permiso por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar permiso por ID' });
  }
});

// Ruta para eliminar un permiso por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const permisoEliminado = await permisos.findByPk(Number(id));
    if (!permisoEliminado) {
      return res.status(404).json({ error: 'Permiso no encontrado' });
    }
    await permisoEliminado.destroy();
    return res.json({ message: 'Permiso eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar permiso por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar permiso por ID' });
  }
});

export default router;
