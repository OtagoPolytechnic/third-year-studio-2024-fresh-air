import React from 'react';
import { UpdateButton } from './UpdateSensorSubComponents/UpdateButton';
// import { UpdateFieldResponse } from './UpdateSensorSubComponents/UpdateFieldResponse';

export const AddSensor = ({ styles }) => {
  return (
    <>
      <div className={`max-w-sm rounded overflow-hidden shadow-lg ${styles}`}>
        <h1 className="ml-4 mt-4 font-bold">Add new device</h1>
        <div class="px-6 py-2">
          <form>
            <div>
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                required
                placeholder="Device Name"
                type="text"
                id="name"
                name="name"
                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                for="deviceEUI"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Device EUI or MAC Address
              </label>
              <input
                placeholder="FF:FF:FF:FF:FF:FF"
                type="text"
                id="deviceEUI"
                name="deviceEUI"
                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
              />
            </div>
          </form>
        </div>
        <div>
          <UpdateButton
            style={
              'bg-green-500 w-[150px] h-[45px] text-white rounded-md ml-6 my-2 sm:mt-0'
            }
            type={'submit'}
            text="Add device"
          />
          {/* <UpdateFieldResponse styles={`${ formError || apiError ? 'text-red-500' : 'text-green-500'} mr-2 text-center`} text={"updateSuccessful" || "formError" || "apiError"}/> */}
        </div>
      </div>
    </>
  );
};
