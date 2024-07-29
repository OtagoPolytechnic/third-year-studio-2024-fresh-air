import React, { useState } from "react";

// SensorFilter component for selecting device and date range
export const SensorFilter = ({ onFilterChange }) => {
  const [beforeDate, setBeforeDate] = useState("");
  const [afterDate, setAfterDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ beforeDate, afterDate });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-8 border border-gray-300 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Before Date:</label>
        <input
          type="date"
          value={beforeDate}
          onChange={(e) => setBeforeDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">After Date:</label>
        <input
          type="date"
          value={afterDate}
          onChange={(e) => setAfterDate(e.target.value)}
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