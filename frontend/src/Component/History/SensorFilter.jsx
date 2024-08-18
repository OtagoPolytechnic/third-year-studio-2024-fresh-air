import React, { useState } from "react";

// SensorFilter component for selecting device and date range
export const SensorFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-8 border border-gray-300 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Apply Filter
      </button>
    </form>
  );
};