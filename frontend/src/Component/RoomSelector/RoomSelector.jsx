import { useState } from "react";
import { useRoomSelector } from "../../Hooks/useRoomSelector";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const RoomSelector = () =>  {
  const { items, error } = useRoomSelector(`${apiKey}/api/v1/devices`);
  const [selectedItem, setSelectedItem] = useState('');
  
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      {items.length > 0 && (
      <>
      <h1>Select an Item:</h1>
      <select value={selectedItem} onChange={handleChange}>
        {items.map(item => (
          <option key={item.id} value={item.deviceId}>
            {item.deviceId}
          </option>
        ))}
      </select>
      <p>Selected Item ID: {selectedItem}</p>
      {error && <p>{error}</p>}
      </>
  )}
    </div>
  );
}

export default RoomSelector;
