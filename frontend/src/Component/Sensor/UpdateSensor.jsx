import { useEffect, useState } from 'react';
import { useUpdateSensor } from '../../Hooks/UpdateSensor/useUpdateSensor';
import { UpdateForm } from './UpdateSensorSubComponents/UpdateForm';

// Main Component for handling Update Form component
// This component will handle the state for the form
// It will also handle the error messages and the api calls

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const UpdateSensor = ({ styles }) => {
  const {
    items,
    apiError,
    resetApiError,
    updateSensorRequest,
    updateSuccess,
    resetUpdateSuccess
  } = useUpdateSensor(`${apiKey}/api/v1/devices`);
  const [selectedItem, setSelectedItem] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');


  // Update the selected item and input value when a sensor is clicked
  const handleChange = (dev_eui) => {
    setSelectedItem(dev_eui);
    const selectedDevice = items.find((item) => item.dev_eui === dev_eui);
    setInputValue(selectedDevice?.deviceName || ''); // Set the input value based on the selected sensor
    resetUpdateSuccess(); // Reset the success message when a new sensor is selected
    setError(''); // Clear any previous error
  };

  // Update input value state
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };




  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      resetApiError();
      setError('');

      if (!selectedItem) {
        return setError('No sensor selected.');
      }

      if (!inputValue || inputValue.trim() === '') {
        return setError('Input field empty.');
      }

      await updateSensorRequest(
        `${apiKey}/api/v1/devices`,
        selectedItem,
        inputValue
      );

    } catch (error) {
      setError(error.message || 'An error occurred.');
    } finally {
      setInputValue('');
    }
  };
  

  return (
    <section className={styles}>
      <div className="border rounded-lg shadow-lg max-w-lg bg-gray-200">
        <h1 className={'ml-2 text-center'}>Rename Sensor</h1>
        {items.length > 0 && (
          <UpdateForm
            styles={'flex flex-col'}
            onSubmit={handleSubmit}
            onChange={handleChange} // Update the selected sensor on change
            onInput={handleInput}
            dropDownChildren={items}
            selectedItem={selectedItem}
            inputValue={inputValue} // Pass selected item to inputValue for comparison
            formError={error}
            apiError={apiError}
            updateSuccessful={updateSuccess} // Pass update message to UpdateForm
            sensorUnassigned="Unassigned" // Fallback text for unassigned sensors
          />
        )}
      </div>
    </section>
  );
};
