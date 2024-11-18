import { useState } from 'react';
import TextInput from '../Input/TextInput';
import { UpdateButton } from '../Sensor/UpdateSensorSubComponents/UpdateButton';
import { UpdateInput } from '../Sensor/UpdateSensorSubComponents/UpdateSensorInput';

const UpdatePassword = ({ onClick, onSubmit, onChange, inputValue }) => {
  const [password, setNewPassword] = useState('');

  return (
    <section
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <section className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
        <section className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
          <button
            onClick={onClick}
            className="absolute top-4 right-4 text-gray-400 text-2xl hover:text-gray-600"
            aria-label="Close modal"
          >
            &times;
          </button>

          <h2
            id="modal-title"
            className="text-center text-2xl font-bold tracking-tight text-gray-900"
          >
            New Password
          </h2>

          <form className="space-y-2 mt-6" onSubmit={onSubmit}>
            <>
              <UpdateInput
                onChange={onChange}
                styles={
                  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                }
                type={'password'}
                placeholder={'New Password'}
                value={inputValue}
              />
              <section>
                <UpdateButton
                  style={
                    'w-full bg-blue-500 hover:bg-sky-500 text-white py-2 px-4 rounded-md'
                  }
                  type={'submit'}
                  text={'Update Password'}
                />
              </section>
            </>
          </form>
        </section>
      </section>
    </section>
  );
};

export default UpdatePassword;
