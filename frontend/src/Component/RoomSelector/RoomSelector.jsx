import { useState } from "react";
import { useRoomSelector } from "../../Hooks/useRoomSelector";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const RoomSelector = () =>  {
  const { items, error } = useRoomSelector(`${apiKey}/api/v1/devices`);
  const [selectedItem, setSelectedItem] = useState('');
  const[value, setValue] = useState('');
  
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(value)
  }

  const handleInput = (event) => {
    setValue(event.target.value);
  }


console.log(value)
  return (
    <div className='border rounded-lg shadow-lg mx-2 mt-2'>
      {items.length > 0 && (
      <form class='flex flex-col'  onSubmit={handleSubmit}>
      <>
      <h1>Update Room Number</h1>
      <select className='border rounded-lg shadow-lg' value={selectedItem} onChange={handleChange}>
        <option value="" defaultValue="" disabled>Select Room</option>
          {items.map(item => (
            <option key={item.id} value={item.deviceID}>
            {item.deviceID}
          </option>
        ))}
      </select>
      <input className='border rounded-lg shadow-lg' type='text' onChange={handleInput} value={value}></input>
      <button type='submit'>Button</button>
      {error && <p>{error}</p>}
      </>
    </form>
  )}
    </div>
  );
}

export default RoomSelector;
