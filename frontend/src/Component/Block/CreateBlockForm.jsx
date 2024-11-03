import { UpdateButton } from '../Sensor/UpdateSensorSubComponents/UpdateButton';
import { UpdateFieldResponse } from '../Sensor/UpdateSensorSubComponents/UpdateFieldResponse';
import { UpdateInput } from '../Sensor/UpdateSensorSubComponents/UpdateSensorInput';

const CreateBlockForm = ({
  onSubmit,
  onInput,
  inputValue,
  formError,
  apiError,
  updateSuccessful
}) => {
  return (
    <form className={'space-y-4 mt-6'} onSubmit={onSubmit}>
      <UpdateInput
        onChange={onInput}
        styles={'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'}
        type={'text'}
        placeholder={'Block Name'}
        value={inputValue}
      />

      <section className={''}>
        <UpdateButton
          style={
            'w-full bg-blue-500 hover:bg-sky-500 text-white py-2 px-4 rounded-md'
          }
          type={'submit'}
          text="Create Block"
        />
      <UpdateFieldResponse styles={`${ updateSuccessful ? 'text-green-500' : 'text-red-500'} mr-2 mt-2 text-center`} text={updateSuccessful || formError || apiError}/>
      </section>
    </form>
  );
};

export default CreateBlockForm;
