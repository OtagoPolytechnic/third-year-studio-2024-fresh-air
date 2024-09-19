import React, {useEffect, useState} from "react";

const QuickFilterButton = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    type="button"
    className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border ${isActive ? 'bg-black text-white border-black' : 'bg-white text-gray-900 border-gray-200'} hover:bg-black hover:text-white`}
    aria-label={label}
  >
    {label}
  </button>
);

export const QuickFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("Today");

  useEffect(() => {
    setToday();
  }, []);

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    onFilterChange({ startDate: today, endDate: today }); 
    setActiveFilter("Today");   
  };
 
  const setThisWeek = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    const startDate = sevenDaysAgo.toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];
    onFilterChange({ startDate, endDate });
    setActiveFilter("Week");
  };

  const setThisMonth = () => {
    const date = new Date();
    const aMonthAgo = new Date(date);
    aMonthAgo.setDate(date.getDate() - 30);
    const startDate = aMonthAgo.toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];
    onFilterChange({ startDate, endDate });
    setActiveFilter("Month");
  };

  return (
    <div data-cy="QuickFilter">
      <QuickFilterButton data-cy="FilterToday" label="Today" isActive={activeFilter === "Today"} onClick={setToday} />
      <QuickFilterButton data-cy="FilterWeek" label="Last week" isActive={activeFilter === "Week"} onClick={setThisWeek} />
      <QuickFilterButton data-cy="FilterMonth" label="Last month" isActive={activeFilter === "Month"} onClick={setThisMonth} />
    </div>
  );
};
