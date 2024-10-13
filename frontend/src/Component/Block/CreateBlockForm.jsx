import { UpdateButton } from '../Sensor/UpdateSensorSubComponents/UpdateButton';
import { UpdateFieldResponse } from '../Sensor/UpdateSensorSubComponents/UpdateFieldResponse';
import { UpdateInput } from '../Sensor/UpdateSensorSubComponents/UpdateSensorInput';

const CreateBlockForm = ({
  styles,
  onSubmit,
  onInput,
  inputValue,
  formError,
  apiError,
  updateSuccessful
}) => {
  return (
    <form className={styles} onSubmit={onSubmit}>
      <UpdateInput
        onChange={onInput}
        styles={'border rounded-lg shadow-lg pl-2 mx-2'}
        type={'text'}
        placeholder={'Block Name'}
        value={inputValue}
      />

      <section className={'grid grid-cols-2 grid-rows-1 items-center mt-2'}>
        <UpdateButton
          style={
            'bg-green-500 w-[150px] h-[45px] text-white rounded-md ml-4 my-2 sm:mt-0'
          }
          type={'submit'}
          text="Create Block"
        />
<UpdateFieldResponse
          styles={`${
            formError || apiError ? 'text-red-500' : updateSuccessful ? 'text-green-500' : ''
          } mr-2 text-center`}
          text={updateSuccessful || formError || apiError}
        />
      </section>
    </form>
  );
};

export default CreateBlockForm;
