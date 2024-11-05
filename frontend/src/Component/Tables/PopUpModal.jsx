import React, { useState, useEffect } from 'react';
import { UpdateButton } from '../Sensor/UpdateSensorSubComponents/UpdateButton';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const PopUp = ({ handleClick, item, listOfBlocks, updateTableData }) => {
  const [name, setName] = useState(item?.room_number || ''); 
  const [blockName, setBlockName] = useState(item?.blockName || ''); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      if (item.room_number !== e.target.name.value) {
        const updatedItem ={
            dev_eui: item.dev_eui,
            room_number: e.target.name.value,
        }
         await fetch(`${apiKey}/api/v1/devices/${item?.dev_eui}`, {
            method: 'PUT', // or 'PATCH'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
          });
      }
      const  updatedItem = {
        dev_eui: item.dev_eui,
        blockName: blockName,
      }

      const response = await fetch(`${apiKey}/api/v1/devices/addBlock/${item?.dev_eui}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Device updated successfully!');
      updateTableData(updatedItem); // Update the table data
      handleClick(); // Close the modal
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <h1 className="text-lg ml-4 mt-4 font-bold">Edit Device</h1>
        <div className="px-6 py-2">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                value={name} // Controlled input
                onChange={(e) => setName(e.target.value)} // Update state
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="deviceEUI" className="block text-sm font-medium leading-6 text-gray-900">
                Device EUI or MAC Address
              </label>
              <input
                disabled
                placeholder="FF:FF:FF:FF:FF:FF"
                type="text"
                id="deviceEUI"
                name="deviceEUI"
                defaultValue={item?.dev_eui} // Display the device EUI
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="blockName" className="block text-sm font-medium leading-6 text-gray-900">
                Block Name
              </label>
              <select
                required
                id="blockName"
                name="blockName"
                value={blockName} // Controlled input
                onChange={(e) => setBlockName(e.target.value)} // Update state
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
              >
                {listOfBlocks && listOfBlocks.length > 0 ? (
                  listOfBlocks.map((block) => (
                    <option key={block.blockName} value={block.blockName}>
                      {block.blockName}
                    </option>
                  ))
                ) : (
                  <option value="">No blocks available</option> // In case of no blocks
                )}
              </select>
            </div>
            <div className="flex justify-end mb-2 mt-4">
              <UpdateButton
                style={'bg-blue-500 w-[150px] h-[45px] text-white rounded-md ml-6'}
                type={'submit'} // Ensure this is set to submit
                text="Save Changes"
              />
              <UpdateButton
                style={'bg-red-500 w-[150px] h-[45px] text-white rounded-md mx-6'}
                type="button" // Make sure this button is just a "button", not "submit"
                onClick={handleClick} // Close button
                text="Cancel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
