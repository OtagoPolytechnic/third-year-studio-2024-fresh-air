import React, { useState, useEffect } from 'react';

const RoomSelector = () =>  {
  const [items, setItems] = useState([]); 
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://co2-app.duckdns.org/api/v1/devices'); 
        const data = await response.json();
        setItems(data.data);
        // if (data.length > 0) {
        //   setSelectedItem(data[0].id);
        // }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      </>
  )}
    </div>
  );
}

export default RoomSelector;
