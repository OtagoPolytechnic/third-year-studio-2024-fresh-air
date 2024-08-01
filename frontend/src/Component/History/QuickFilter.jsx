import React from "react";

const QuickFilterButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white"
    aria-label={label}
  >
    {label}
  </button>
);

export const QuickFilter = ({ onFilterChange }) => {
  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    onFilterChange({ beforeDate: today, afterDate: today });    
  };

  const setThisWeek = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    const beforeDate = sevenDaysAgo.toISOString().split("T")[0];
    const afterDate = new Date().toISOString().split("T")[0];
    onFilterChange({ beforeDate, afterDate });
  };

  const setThisMonth = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split("T")[0];
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split("T")[0];
    onFilterChange({ beforeDate: firstDay, afterDate: lastDay });
  };

  return (
    <div>
      <QuickFilterButton label="Today" onClick={setToday} />
      <QuickFilterButton label="This week" onClick={setThisWeek} />
      <QuickFilterButton label="This month" onClick={setThisMonth} />
    </div>
  );
};
