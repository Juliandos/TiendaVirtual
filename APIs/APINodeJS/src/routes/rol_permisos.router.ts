import express, { Request, Response } from 'express';
import { rol_permisos, rol_permisosAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del 
import { Sequelize } from 'sequelize';

const router = express.Router();

// Ruta para crear una nueva relación entre rol y permisos
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaRelacionRolPermisos = await rol_permisos.create(req.body as rol_permisosAttributes);
    return res.json(nuevaRelacionRolPermisos);
  } catch (error) {
    console.error('Error al crear una relación rol-permisos:', error);
    return res.status(500).json({ error: 'Error al crear una relación rol-permisos' });
  }
});

// Ruta para obtener todas las relaciones rol-permisos
router.get('/', async (req: Request, res: Response) => {
  try {
    const relacionesRolPermisos = await rol_permisos.findAll();
    return res.json(relacionesRolPermisos);
  } catch (error) {
    console.error('Error al obtener relaciones rol-permisos:', error);
    return res.status(500).json({ error: 'Error al obtener relaciones rol-permisos' });
  }
});

// Ruta para obtener una relación rol-permisos por ID de rol y permisos
router.get('/:rol_id/:permisos_id', async (req: Request, res: Response) => {
  const { rol_id, permisos_id } = req.params;
  try {
    const relacionEncontrada = await rol_permisos.findOne({
      where: { rol_id, permisos_id },
    });
    if (!relacionEncontrada) {
      return res.status(404).json({ error: 'Relación rol-permisos no encontrada' });
    }
    return res.json(relacionEncontrada);
  } catch (error) {
    console.error('Error al obtener relación rol-permisos por ID:', error);
    return res.status(500).json({ error: 'Error al obtener relación rol-permisos por ID' });
  }
});

// Ruta para actualizar una relación rol-permisos por ID de rol y permisos
router.put('/:rol_id/:permisos_id', async (req: Request, res: Response) => {
  const { rol_id, permisos_id } = req.params;
  try {
    const relacionActualizada = await rol_permisos.findOne({
      where: { rol_id, permisos_id },
    });
    if (!relacionActualizada) {
      return res.status(404).json({ error: 'Relación rol-permisos no encontrada' });
    }
    await relacionActualizada.update(req.body as rol_permisosAttributes);
    return res.json(relacionActualizada);
  } catch (error) {
    console.error('Error al actualizar relación rol-permisos por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar relación rol-permisos por ID' });
  }
});

// Ruta para eliminar una relación rol-permisos por ID de rol y permisos
router.delete('/:rol_id/:permisos_id', async (req: Request, res: Response) => {
  const { rol_id, permisos_id } = req.params;
  try {
    const relacionEliminada = await rol_permisos.findOne({
      where: { rol_id, permisos_id },
    });
    if (!relacionEliminada) {
      return res.status(404).json({ error: 'Relación rol-permisos no encontrada' });
    }
    await relacionEliminada.destroy();
    return res.json({ message: 'Relación rol-permisos eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar relación rol-permisos por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar relación rol-permisos por ID' });
  }
});

router.post('/modulo', async (req: Request, res: Response) => {
  try {
    const {email, modulo} = req.body;
    
    const query = `
      SELECT 
        p.nombre AS modulo,
        per.r,
        per.w,
        per.u,
        per.d
        FROM persona pe
        JOIN persona_rol pr ON pe.id = pr.persona_id
        JOIN rol r ON pr.rol_id = r.id
        JOIN rol_permisos rp ON r.id = rp.rol_id
        JOIN permisos per ON rp.permisos_id = per.id
        JOIN modulo p ON per.modulo_id = p.id
        WHERE pe.email = '${email}' AND p.nombre = '${modulo}';
    `;

    const sequelize: Sequelize | undefined = rol_permisos.sequelize;

    if (!sequelize) {
      throw new Error('No es posible obtener la referencia al objeto Sequelize');
    }
    
    const [result]: any = await sequelize.query(query);
    
    // console.log('esteme', result[0]);
    return res.json(result[0]);
  } catch (error) {
    console.error('Error al crear una relación rol-permisos:', error);
    return res.status(500).json({ error: 'Error al crear una relación rol-permisos' });
  }
});

export default router;
