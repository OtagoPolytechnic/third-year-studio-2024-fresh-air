const SelectInput = ({ id, name, required = false, ariaLabel, options }) => {
    return (
      <select
        id={id}
        name={name}
        required={required}
        aria-label={ariaLabel}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select {name}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

export default SelectInput;