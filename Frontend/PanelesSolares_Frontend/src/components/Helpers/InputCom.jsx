import PropTypes from 'prop-types';

function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  labelClasses = "text-qgray text-[13px] font-normal",
  disabled = false
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block  mb-2 ${labelClasses || ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
        <input
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
          className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none ${
            inputClasses || ""
          }`}
          type={type}
          id={name}
          disabled = {disabled}
        />
        {children && children}
      </div>
    </div>
  );
}

InputCom.propTypes = {
  /** Texto de la etiqueta del input */
  label: PropTypes.string,
  
  /** Tipo de input (text, password, email, etc.) */
  type: PropTypes.oneOf([
    'text', 
    'password', 
    'email', 
    'number', 
    'tel', 
    'url',
    'search',
    'date',
  ]).isRequired,
  
  /** Nombre del campo (para formularios y htmlFor) */
  name: PropTypes.string.isRequired,
  
  /** Texto del placeholder */
  placeholder: PropTypes.string,
  
  /** Contenido adicional (como íconos) */
  children: PropTypes.node,
  
  /** Manejador de cambios del input */
  inputHandler: PropTypes.func.isRequired,
  
  /** Valor del input (para componentes controlados) */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  
  /** Clases CSS adicionales para el input */
  inputClasses: PropTypes.string,
  
  /** Clases CSS adicionales para la etiqueta */
  labelClasses: PropTypes.string,

  disabled: PropTypes.bool

};

InputCom.defaultProps = {
  type: 'text',
  labelClasses: "text-qgray text-[13px] font-normal"
};

export default InputCom;