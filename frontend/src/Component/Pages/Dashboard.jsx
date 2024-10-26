// import { UpdateSensor } from '../Sensor/UpdateSensor';
// import { AddSensor } from '../Sensor/AddSensor';
// import Register from '../Auth/Register';
// import CreateBlock from '../Block/CreateBlock';
// import UpdateBlock from '../Block/UpdateBlock';
// import AddDeviceToBlock from '../Block/AddDeviceToBlock';
import { useGetDeviceList } from '../../Hooks/Devices/useGetDeviceList';
import AdminPanel from '../Tables/AdminPanel';
import { useState } from 'react';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const DashBoard = () => {
  const { devices, apiError } = useGetDeviceList(`${apiKey}/api/v1/devices`);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      const direction =
        prevConfig.key === key && prevConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending';
      return { key, direction };
    });
  };

  const sortedDevices = [...devices].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const comparison = aValue.localeCompare(bValue, undefined, {
        numeric: true
      });

      return sortConfig.direction === 'ascending' ? comparison : -comparison;
    }
    return 0;
  });

  return (
    <>
      {apiError ? (
        <div className={'bg-red-500 text-white p-4'}>Error: {apiError}</div>
      ) : (
        <>
        <AdminPanel/>
          <section className={'flex justify-end items-center mt-4 mx-4 mb-2'}>
            <button
              className={'px-4 py-2 text-white bg-blue-500 rounded-lg mx-2'}
            >
              Add User
            </button>
            <button className={'px-4 py-2 text-white bg-blue-500 rounded-lg'}>
              Add Device
            </button>
          </section>
          <section
            className={
              'relative overflow-x-auto mx-4 rounded-lg border shadow-sm '
            }
          >
            <table className={'w-full text-sm text-left text-gray-500'}>
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-2 sm:text-clip"
                    onClick={() => handleSort('dev_eui')}
                    style={{ cursor: 'pointer' }}
                  >
                    Device EUI{' '}
                    {sortConfig.key === 'dev_eui'
                      ? sortConfig.direction === 'ascending'
                        ? '▲'
                        : '▼'
                      : ''}
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('room_number')}
                    style={{ cursor: 'pointer' }}
                  >
                    Room Number{' '}
                    {sortConfig.key === 'room_number'
                      ? sortConfig.direction === 'ascending'
                        ? '▲'
                        : '▼'
                      : ''}
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('blockName')}
                    style={{ cursor: 'pointer' }}
                  >
                    Block{' '}
                    {sortConfig.key === 'blockName'
                      ? sortConfig.direction === 'ascending'
                        ? '▲'
                        : '▼'
                      : ''}
                  </th>
                  <th scope="col" className={''}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDevices.map((device) => (
                  <tr
                    key={device.id}
                    className={'bg-white border-b hover:bg-slate-50'}
                  >
                    <td
                      className={
                        'pl-2 py-4 font-medium text-gray-900 whitespace-nowrap'
                      }
                    >
                      {device.dev_eui}
                    </td>

                    <td className={''}>{device.room_number}</td>
                    <td className={''}>{device.blockName}</td>
                    <td className={''}>
                      <button className={'text-blue-500'}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
};

export default DashBoard;
