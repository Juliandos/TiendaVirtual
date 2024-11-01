import express, { Request, Response } from 'express';
import { tipo_pago, tipo_pagoAttributes } from '../models/init-models.model';

const router = express.Router();

// Ruta para crear un nuevo tipo_pago
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoTipoPago = await tipo_pago.create(req.body as tipo_pagoAttributes);
    return res.json(nuevoTipoPago);
  } catch (error) {
    console.error('Error al crear un tipo_pago:', error);
    return res.status(500).json({ error: 'Error al crear un tipo_pago' });
  }
});

// Ruta para obtener todos los tipo_pagos
router.get('/', async (req: Request, res: Response) => {
  try {
    const tipoPagos = await tipo_pago.findAll();
    return res.json(tipoPagos);
  } catch (error) {
    console.error('Error al obtener tipo_pagos:', error);
    return res.status(500).json({ error: 'Error al obtener tipo_pagos' });
  }
});

// Ruta para obtener un tipo_pago por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tipoPagoEncontrado = await tipo_pago.findByPk(Number(id));
    if (!tipoPagoEncontrado) {
      return res.status(404).json({ error: 'Tipo de pago no encontrado' });
    }
    return res.json(tipoPagoEncontrado);
  } catch (error) {
    console.error('Error al obtener tipo_pago por ID:', error);
    return res.status(500).json({ error: 'Error al obtener tipo_pago por ID' });
  }
});

// Ruta para actualizar un tipo_pago por ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tipoPagoActualizado = await tipo_pago.findByPk(Number(id));
    if (!tipoPagoActualizado) {
      return res.status(404).json({ error: 'Tipo de pago no encontrado' });
    }
    await tipoPagoActualizado.update(req.body as tipo_pagoAttributes);
    return res.json(tipoPagoActualizado);
  } catch (error) {
    console.error('Error al actualizar tipo_pago por ID:', error);
    return res.status(500).json({ error: 'Error al actualizar tipo_pago por ID' });
  }
});

// Ruta para eliminar un tipo_pago por ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tipoPagoEliminado = await tipo_pago.findByPk(Number(id));
    if (!tipoPagoEliminado) {
      return res.status(404).json({ error: 'Tipo de pago no encontrado' });
    }
    await tipoPagoEliminado.destroy();
    return res.json({ message: 'Tipo de pago eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar tipo_pago por ID:', error);
    return res.status(500).json({ error: 'Error al eliminar tipo_pago por ID' });
  }
});

export default router;
