import express, { Request, Response } from 'express';
import { factura, facturaAttributes } from '../models/init-models.model';

const router = express.Router();

// Ruta para crear una nueva factura
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevaFactura = await factura.create(req.body as facturaAttributes);
    return res.json(nuevaFactura);
  } catch (error) {
    console.error('Error al crear una factura:', error);
    return res.status(500).json({ error: 'Error al crear una factura' });
  }
});

// Ruta para obtener todas las facturas
router.get('/', async (req: Request, res: Response) => {
  try {
    const facturas = await factura.findAll();
    console.log(facturas);
    return res.json(facturas);
  } catch (error) {
    const facturas = await factura.findAll();
    console.log(facturas);
    // print(facturas);
    
    return res.json(facturas);
    // console.error('Error al obtener facturas:', error);
    // return res.status(500).json({ error: 'Error al obtener facturas' });
  }
});

// Ruta para obtener una factura por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const facturaEncontrada = await factura.findByPk(Number(id));
    if (!facturaEncontrada) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    return res.json(facturaEncontrada);
  } catch (error) {
    console.error('Error al obtener factura por ID:', error);
    return res.status(500).json({ error: 'Error al obtener factura por ID' });
  }
});

// Ruta para actualizar una factura por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const facturaActualizada = await factura.findByPk(Number(id));
    if (!facturaActualizada) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    await facturaActualizada.update(req.body as facturaAttributes);
    return res.json(facturaActualizada);
  } catch (error) {
    console.error('Error al actualizar factura por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar factura por ID' });
  }
});

// Ruta para eliminar una factura por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const facturaEliminada = await factura.findByPk(Number(id));
    if (!facturaEliminada) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    await facturaEliminada.destroy();
    return res.json({ message: 'Factura eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar factura por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar factura por ID' });
  }
});

export default router;
