import React, { useState, useEffect } from "react";

// SensorFilter component for selecting device and date range
export const SensorFilter = ({ onFilterChange }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const [afterDate, setAfterDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Get the API key from environment variables
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

  // Fetch devices on component mount
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`${apiKey}/api/v1/devices`);
        const data = await response.json();
        setDevices(data.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching devices:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchDevices();
  }, [apiKey]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDeviceObj = devices.find(device => device.room_number === selectedDevice);
    onFilterChange({ device: selectedDeviceObj?.dev_eui, beforeDate, afterDate });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-8 border border-gray-300 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Device Name:</label>
        <select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>{loading ? "Loading devices..." : "Select a device"}</option>
          {!loading && devices.length > 0 && devices.map(device => (
            <option key={device.dev_eui} value={device.room_number}>
              {device.room_number}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Before Date:</label>
        <input
          type="date"
          value={beforeDate}
          onChange={(e) => setBeforeDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">After Date:</label>
        <input
          type="date"
          value={afterDate}
          onChange={(e) => setAfterDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Apply Filter
      </button>
    </form>
  );
};