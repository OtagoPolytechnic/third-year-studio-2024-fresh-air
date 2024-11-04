import { UpdateButton } from '../../Sensor/UpdateSensorSubComponents/UpdateButton';
import { UpdateFieldResponse } from '../../Sensor/UpdateSensorSubComponents/UpdateFieldResponse';
import { UpdateInput } from '../../Sensor/UpdateSensorSubComponents/UpdateSensorInput';
import { UpdateBlockDropDown } from './UpdateBlockDropDown';

export const UpdateBlockForm = ({
  onSubmit,
  onChange,
  onInput,
  inputValue,
  dropDownValue,
  dropDownChildren,
  formError,
  apiError,
  updateSuccessful,
  onClick
}) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity b"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
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
            Update Block
          </h2>
          <form className={'space-y-4 mt-6'} onSubmit={onSubmit}>
            <UpdateBlockDropDown
              styles={
                'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              }
              onChange={onChange}
              value={dropDownValue}
              disabled={true}
              headerValue={''}
              optionHeaderText={'Select Block'}
              blockData={dropDownChildren}
            />
            <UpdateInput
              onChange={onInput}
              styles={
                'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              }
              type={'text'}
              placeholder={'Block Name'}
              value={inputValue}
            />
            <section>
              <UpdateButton
                style={
                  'w-full bg-blue-500 hover:bg-sky-500 text-white py-2 px-4 rounded-md'
                }
                type={'submit'}
                text="Update Block"
              />
              <UpdateFieldResponse
                styles={`${updateSuccessful ? 'text-green-500' : 'text-red-500'} mr-2 mt-2 text-center`}
                text={updateSuccessful || formError || apiError}
              />
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};
