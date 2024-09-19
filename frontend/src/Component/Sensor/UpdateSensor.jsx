import { useState } from "react";
import { useUpdateSensor } from "../../Hooks/UpdateSensor/useUpdateSensor";
import { UpdateForm } from "./UpdateSensorSubComponents/UpdateForm";

// Main Component for handling Update Form component
// This component will handle the state for the form
// It will also handle the error messages and the api calls

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const UpdateSensor = ({styles}) =>  {
  const { items, apiError, resetApiError, updateSensorRequest, updateSuccess, resetUpdateSuccess } = useUpdateSensor(`${apiKey}/api/v1/devices`);
  const [selectedItem, setSelectedItem] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    setInputValue('');
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      resetUpdateSuccess();
      resetApiError();
      setError('');

    if (!selectedItem) {
      return setError('No sensor selected.');
    }

    if (!inputValue || inputValue.startsWith(' ')) {
      return setError('Input field empty.');
    }
    await updateSensorRequest(`${apiKey}/api/v1/devices`, selectedItem , inputValue);

  } catch (error) {
    setError(error);
  } finally {
    setInputValue('');
  }
}

  return (
    <section className={` ${styles}`}>
      <div className='border rounded-lg shadow-lg sm:w-[500px] sm:max-h-[150px] bg-gray-200'>
        <h1 className={'ml-2 text-center'}>Rename Sensor</h1>
        {items.length > 0 && (
          <UpdateForm
          styles={'flex flex-col'}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onInput={handleInput}
          dropDownValue={selectedItem}
          dropDownChildren={items}
          inputValue={inputValue}
          formError={error}
          apiError={apiError}
          updateSuccessful={updateSuccess}
          />
        )}
      </div>
    </section>
  );
}