import { useState } from "react";
import { useUpdateSensor } from "../../Hooks/UpdateSensor/useUpdateSensor";
import { UpdateButton } from "./UpdateSensorSubComponents/UpdateButton";
import { UpdateForm } from "./UpdateSensorSubComponents/UpdateForm";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const UpdateSensor = () =>  {
  const { items, apiError, resetApiError } = useUpdateSensor(`${apiKey}/api/v1/devices`);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
    if (selectedItem === '') return setError('No sensor selected');
    if (inputValue === '') return setError('Input field empty');

    resetApiError();
    setError('');
    alert(`${selectedItem} ${inputValue}`);

    // const postToApi = async () => {
    //   await fetch(`${apiKey}/api/v1/devices/${selectedItem}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ room_number: inputValue }),
    //   });
    // };
  } catch (error) {
    setError(error);
  } finally {
    setInputValue('');
  }
  }

  return (
    <section className='border rounded-lg shadow-lg mx-2 mt-2 sm:min-w-[500px] sm:min-h-[200px] bg-[#F2F2F2]'>
      <h1 className={'ml-2 font-sans'}>Rename Sensor</h1>
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
        />

  )}
    </section>
  );
}