import PropTypes from 'prop-types';

function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  onChange,  // Cambiado de inputHandler a onChange
  value,
  inputClasses,
  labelClasses = "text-qgray text-[13px] font-normal",
  disabled = false
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block mb-2 ${labelClasses || ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative">
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}  // Usando onChange aquí
          className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${inputClasses || ""}`}
          type={type}
          id={name}
          name={name}  // Añadido para acceso por e.target.name
          disabled={disabled}
        />
        {children}
      </div>
    </div>
  );
}

InputCom.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf([
    'text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'
  ]).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,  // Cambiado de inputHandler a onChange
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  disabled: PropTypes.bool
};

InputCom.defaultProps = {
  type: 'text',
  labelClasses: "text-qgray text-[13px] font-normal"
};

export default InputCom;