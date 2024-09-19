const TextInput = ({ id, type, name, placeholder, required = false, ariaLabel }) => {
    return (
      <input
        required={required}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    );
  };

export default TextInput;