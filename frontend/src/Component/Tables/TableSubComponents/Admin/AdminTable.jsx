import React, { useState, useEffect } from 'react'; // Import useEffect and useState
import TableHeaders from "../TableHeaders";
import { useGetDeviceList } from "../../../../Hooks/Devices/useGetDeviceList";
import AdminTableBody from "./AdminTableBody";
import { tableHeaders } from "../../../../utils/constants/constants";
import useSortableData from "../../../../Hooks/Tables/useSortableTable";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const AdminTable = () => {
  const { devices: initialData, apiError } = useGetDeviceList(`${apiKey}/api/v1/devices`);
  const { sortedData, onSort, sortConfig } = useSortableData(initialData);
  const [tableData, setTableData] = useState(initialData || []); // Initialize with fetched data

  // Update tableData whenever initialData changes
  useEffect(() => {
    if (initialData) {
      setTableData(initialData);
    }
  }, [initialData]);

  const updateTableData = (updatedItem) => {
    setTableData(prevData =>
      prevData.map(item =>
        item.dev_eui === updatedItem.dev_eui
          ? { ...item, ...updatedItem}
          : item
      )
    );
  };

  return (
    <>
      {apiError ? (
        <div className={'bg-red-500 text-white p-4'}>Error: {apiError}</div>
      ) : (
        <table className={'w-full text-sm text-left text-gray-500 divide-y divide-gray-200'}>
          <TableHeaders headers={tableHeaders} onSort={onSort} sortConfig={sortConfig} />
          <AdminTableBody tableFields={tableData} updateTableData={updateTableData} />
        </table>
      )}
    </>
  );
};

export default AdminTable;