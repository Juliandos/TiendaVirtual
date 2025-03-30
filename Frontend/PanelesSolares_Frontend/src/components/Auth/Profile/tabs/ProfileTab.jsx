import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormularioActualizacionPersona = ({ persona, onUpdate }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [errorRepetido, setErrorRepetido] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  // Rellenar formulario con datos existentes al cargar
  useEffect(() => {
    if (persona) {
      Object.keys(persona).forEach(key => {
        setValue(key, persona[key]);
      });
    }
  }, [persona, setValue]);

  const onSubmit = async (data) => {
    setCargando(true);
    setErrorRepetido(false);
    setMensajeExito('');
    
    try {
      // // Verificar si el nombre ya existe (excepto para el mismo usuario)
      // const response = await axios.get(`http://127.0.0.1:8000/personas/verificar-nombre/${data.nombre}`);
      
      // if (response.data.existe && response.data.id !== persona.id) {
      //   setErrorRepetido(true);
      //   setTimeout(() => setErrorRepetido(false), 3000);
      //   return;
      // }

      // Actualizar los datos
      const updateResponse = await axios.put('http://127.0.0.1:8000/personas/actualizar', data);
      
      setMensajeExito('Datos actualizados correctamente');
      setTimeout(() => setMensajeExito(''), 3000);
      
      if (onUpdate) {
        onUpdate(updateResponse.data);
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Actualizar Datos</h2>
      
      {errorRepetido && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          ¡El nombre ya está en uso por otro usuario!
        </div>
      )}
      
      {mensajeExito && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre:</label>
          <input
            {...register('nombre', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Teléfono:</label>
          <input
            {...register('telefono')}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            {...register('email', { 
              required: 'Este campo es requerido',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Ingrese un email válido'
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contraseña:</label>
          <input
            type="password"
            {...register('contrasena')}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Salario:</label>
          <input
            type="number"
            {...register('salario')}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Dirección:</label>
          <input
            {...register('direccion')}
            className="w-full p-2 border rounded"
          />
        </div>

        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('token')} />
        <input type="hidden" {...register('status')} />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {cargando ? 'Actualizando...' : 'Actualizar Datos'}
        </button>
      </form>
    </div>
  );
};

FormularioActualizacionPersona.propTypes = {
  persona: PropTypes.object,
  onUpdate: PropTypes.func
};

export default FormularioActualizacionPersona;