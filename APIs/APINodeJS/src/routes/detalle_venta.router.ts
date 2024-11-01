import express, { Request, Response } from 'express';
import { detalle_venta, detalle_ventaAttributes } from '../models/init-models.model'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para crear un nuevo detalle de venta
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoDetalleVenta = await detalle_venta.create(req.body as detalle_ventaAttributes);
    return res.json(nuevoDetalleVenta);
  } catch (error) {
    console.error('Error al crear un detalle de venta:', error);
    return res.status(500).json({ error: 'Error al crear un detalle de venta' });
  }
});

// Ruta para obtener todos los detalles de venta
router.get('/', async (req: Request, res: Response) => {
  try {
    const detallesVenta = await detalle_venta.findAll();
    return res.json(detallesVenta);
  } catch (error) {
    console.error('Error al obtener detalles de venta:', error);
    return res.status(500).json({ error: 'Error al obtener detalles de venta' });
  }
});

// Ruta para obtener un detalle de venta por servicio_venta_id y producto_id
router.get('/:servicio_venta_id/:producto_id', async (req: Request, res: Response) => {
  const { servicio_venta_id, producto_id } = req.params;
  try {
    const detalleVentaEncontrado = await detalle_venta.findOne({
      where: { servicio_venta_id, producto_id },
    });
    if (!detalleVentaEncontrado) {
      return res.status(404).json({ error: 'Detalle de venta no encontrado' });
    }
    return res.json(detalleVentaEncontrado);
  } catch (error) {
    console.error('Error al obtener detalle de venta por IDs:', error);
    return res.status(500).json({ error: 'Error al obtener detalle de venta por IDs' });
  }
});

// Ruta para actualizar un detalle de venta por servicio_venta_id y producto_id
router.put('/:servicio_venta_id/:producto_id', async (req: Request, res: Response) => {
  const { servicio_venta_id, producto_id } = req.params;
  console.log('requisitos', req.params);
  
  try {
    const detalleVentaActualizado = await detalle_venta.findOne({
      where: { servicio_venta_id, producto_id },
    });
    if (!detalleVentaActualizado) {
      return res.status(404).json({ error: 'Detalle de venta no encontrado' });
    }
    await detalleVentaActualizado.update(req.body as detalle_ventaAttributes);
    return res.json(detalleVentaActualizado);
  } catch (error) {
    console.error('Error al actualizar detalle de venta por IDs:', error);
    return res.status(500).json({ error: 'Error al actualizar detalle de venta por IDs' });
  }
});

// Ruta para eliminar un detalle de venta por servicio_venta_id y producto_id
router.delete('/:servicio_venta_id/:producto_id', async (req: Request, res: Response) => {
  const { servicio_venta_id, producto_id } = req.params;
  try {
    const detalleVentaEliminado = await detalle_venta.findOne({
      where: { servicio_venta_id, producto_id },
    });
    if (!detalleVentaEliminado) {
      return res.status(404).json({ error: 'Detalle de venta no encontrado' });
    }
    await detalleVentaEliminado.destroy();
    return res.json({ message: 'Detalle de venta eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar detalle de venta por IDs:', error);
    return res.status(500).json({ error: 'Error al eliminar detalle de venta por IDs' });
  }
});

export default router;
