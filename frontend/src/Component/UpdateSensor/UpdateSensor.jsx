import { useState } from "react";
import { useUpdateSensor } from "../../Hooks/UpdateSensor/useUpdateSensor";
import { UpdateForm } from "./UpdateSensorSubComponents/UpdateForm";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const UpdateSensor = () =>  {
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
    <section className='border rounded-lg shadow-lg mx-2 mt-2 sm:w-[500px] sm:max-h-[150px] bg-[#F2F2F2]'>
      <h1 className={'ml-2'}>Rename Sensor</h1>
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
    </section>
  );
}