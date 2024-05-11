import { useState } from "react";
import { useUpdateSensor } from "../../Hooks/UpdateSensor/useUpdateSensor";
import { UpdateButton } from "./UpdateSensorSubComponents/UpdateButton";
import { UpdateDropdown } from "./UpdateSensorSubComponents/UpdateDropdown";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
    if (selectedItem === '') return setError('No sensor selected');
    if (inputValue === '') return setError('Input field empty');

    resetApiError();
    setError('');
    alert(inputValue);

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

  const handleInput = (event) => {
    setInputValue(event.target.value);
  }
  
  return (
    <section className='border rounded-lg shadow-lg mx-2 mt-2 sm:min-w-[500px] sm:min-h-[200px] bg-[#F2F2F2]'>
      <h1 className={'ml-2 font-sans'}>Rename Sensor</h1>
      {items.length > 0 && (
      <form className={'flex flex-col'}  onSubmit={handleSubmit}>
        <UpdateDropdown
        onChange={handleChange}
        value={selectedItem}
        disabled={true}
        headerValue={''}
        optionHeaderText={'Select Room'}
        children={items}
        childrenUnassigned={'Unassigned'}
        />
      <input className={'border rounded-lg shadow-lg pl-2'} type='text' onChange={handleInput} placeholder={'Device Name'} value={inputValue}/>
      <section className={"grid grid-cols-2 grid-rows-1 items-center"}>
      <UpdateButton style={'bg-green-500 w-[150px] h-[50px] text-white rounded-md mt-2 ml-4 mb-2'} type={'submit'} text="Update Name"/>
      {error && <p className={'text-red-500 text-center border-red-500 rounded-lg'}>{error}</p>}
      {apiError && <p className={'text-red-500 text-center border-red-500 rounded-lg'}>{error}</p>}
      </section>
    </form>
  )}
    </section>
  );
}