// Maps through an array of options to display on screen
const DropDown = ({ placeHolderText, handleChange, options, labelForTag, labelText }) => {
  return (
    <div className={'max-w-sm mx-auto'}>
      <label
        for={labelForTag}
        className={'block text-sm font-medium text-gray-700'}
      >
        {labelText}
      </label>
      <select
      id={labelForTag}
        onChange={handleChange}
        className={
          'bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        }
      >
        <option>{placeHolderText}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
