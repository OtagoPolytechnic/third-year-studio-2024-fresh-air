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
    const aMonthAgo = new Date(date);
    aMonthAgo.setDate(date.getDate() - 30);
    const beforeDate = aMonthAgo.toISOString().split("T")[0];
    const afterDate = new Date().toISOString().split("T")[0];
    console.log(beforeDate);
    console.log(afterDate)
    onFilterChange({ beforeDate, afterDate });
  };

  return (
    <div>
      <QuickFilterButton label="Today" onClick={setToday} />
      <QuickFilterButton label="Last week" onClick={setThisWeek} />
      <QuickFilterButton label="Last month" onClick={setThisMonth} />
    </div>
  );
};
