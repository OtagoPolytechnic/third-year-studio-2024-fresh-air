import { useState } from "react";
import { useUpdateSensor } from "../../Hooks/UpdateSensor/useUpdateSensor";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const UpdateSensor = () =>  {
  const { items, apiError, resetApiError } = useUpdateSensor(`${apiKey}/api/v1/devices`);
  const [selectedItem, setSelectedItem] = useState('');
  const[inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    setInputValue('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
    if (selectedItem === '') return setError('No room selected');

    resetApiError();
    alert(inputValue);
    console.log(selectedItem)

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
    <div className='border rounded-lg shadow-lg mx-2 mt-2 sm:min-w-[500px] sm:min-h-[200px]'>
      {items.length > 0 && (
      <form className={'flex flex-col'}  onSubmit={handleSubmit}>
      <h1 className={'ml-2 font-sans'}>Rename Sensor</h1>
      <select className={'border rounded-lg shadow-lg cursor-pointer'} value={selectedItem} onChange={handleChange}>
        <option value="" defaultValue="" disabled>Select Room</option>
          {items.map(item => (
            <option key={item.id} value={item.dev_eui}>
            {`${item.dev_eui} [${item.roomNumber !== null ? item.roomNumber : "No room number"}]`}
          </option>
        ))}
      </select>
      <input className={'border rounded-lg shadow-lg pl-2'} type='text' onChange={handleInput} placeholder={'Room number'} value={inputValue}/>
      <button className={'bg-green-500 w-[150px] h-[50px] text-white rounded-md mt-2 ml-4 mb-2'} type='submit'>Update Name</button>
      {error && <p className={'text-red-500 text-center border-red-500 rounded-lg'}>{error}</p>}
      {apiError && <p className={'text-red-500 text-center border-red-500 rounded-lg'}>{error}</p>}
    </form>
  )}
    </div>
  );
}


export default UpdateSensor;
