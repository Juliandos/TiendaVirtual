import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

const FormularioActualizacionPersona = ({ persona }) => {
    
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    telefono: '',
    email: '',
    contrasena: '',
    salario: '',
    direccion: '',
    token: '',
    status: ''
  });
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);
  const [errors, setErrors] = useState({});

  // Rellenar formulario con datos existentes al cargar
  useEffect(() => {
    if (persona) {
      setFormData({
        id: persona.id || '',
        nombre: persona.nombre || '',
        telefono: persona.telefono || '',
        email: persona.email || '',
        contrasena: persona.contrasena || '',
        salario: persona.salario || '',
        direccion: persona.direccion || '',
        token: persona.token || '',
        status: persona.status || ''
      });
    }
  }, [persona]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Este campo es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Este campo es requerido';
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = 'Ingrese un email válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setCargando(true);
    setMensajeExito('');
    
    try {
      const updateResponse = await fetch('http://127.0.0.1:8000/personas/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
    
      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || 'Error al actualizar los datos');
      }
    
      await updateResponse.json();
      
      setMensajeExito('Datos actualizados correctamente');
      setTimeout(() => setMensajeExito(''), 3000);
    
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      
      {mensajeExito && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre:</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Teléfono:</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Salario:</label>
          <input
            type="number"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Dirección:</label>
          <input
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input type="hidden" name="id" value={formData.id} />
        <input type="hidden" name="token" value={formData.token} />
        <input type="hidden" name="status" value={formData.status} />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {cargando ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Actualizando...
            </span>
          ) : 'Actualizar Datos'}
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
