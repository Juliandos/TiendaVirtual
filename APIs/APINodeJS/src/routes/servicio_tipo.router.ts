import express, { Request, Response } from 'express';
import { servicio_tipo, servicio_tipoAttributes } from '../models/init-models.model';

const router = express.Router();

// Ruta para crear un nuevo servicio_tipo
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoServicioTipo = await servicio_tipo.create(req.body as servicio_tipoAttributes);
    return res.json(nuevoServicioTipo);
  } catch (error) {
    console.error('Error al crear un servicio_tipo:', error);
    return res.status(500).json({ error: 'Error al crear un servicio_tipo' });
  }
});

// Ruta para obtener todos los servicio_tipos
router.get('/', async (req: Request, res: Response) => {
  try {
    const servicioTipos = await servicio_tipo.findAll();
    return res.json(servicioTipos);
  } catch (error) {
    console.error('Error al obtener servicio_tipos:', error);
    return res.status(500).json({ error: 'Error al obtener servicio_tipos' });
  }
});

// Ruta para obtener un servicio_tipo por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const servicioTipoEncontrado = await servicio_tipo.findByPk(Number(id));
    if (!servicioTipoEncontrado) {
      return res.status(404).json({ error: 'Servicio tipo no encontrado' });
    }
    return res.json(servicioTipoEncontrado);
  } catch (error) {
    console.error('Error al obtener servicio_tipo por ID:', error);
    return res.status(500).json({ error: 'Error al obtener servicio_tipo por ID' });
  }
});

// Ruta para actualizar un servicio_tipo por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const servicioTipoActualizado = await servicio_tipo.findByPk(Number(id));
    if (!servicioTipoActualizado) {
      return res.status(404).json({ error: 'Servicio tipo no encontrado' });
    }
    await servicioTipoActualizado.update(req.body as servicio_tipoAttributes);
    return res.json(servicioTipoActualizado);
  } catch (error) {
    console.error('Error al actualizar servicio_tipo por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar servicio_tipo por ID' });
  }
});

// Ruta para eliminar un servicio_tipo por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const servicioTipoEliminado = await servicio_tipo.findByPk(Number(id));
    if (!servicioTipoEliminado) {
      return res.status(404).json({ error: 'Servicio tipo no encontrado' });
    }
    await servicioTipoEliminado.destroy();
    return res.json({ message: 'Servicio tipo eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar servicio_tipo por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar servicio_tipo por ID' });
  }
});

export default router;
