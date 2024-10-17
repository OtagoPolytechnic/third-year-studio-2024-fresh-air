import { UpdateBlockDropDown } from './UpdateBlockSubComponents/UpdateBlockDropDown';
import { UpdateButton } from '../Sensor/UpdateSensorSubComponents/UpdateButton';
import { UpdateFieldResponse } from '../Sensor/UpdateSensorSubComponents/UpdateFieldResponse';
import { UpdateDropdown } from '../Sensor/UpdateSensorSubComponents/UpdateDropdown';
const AddDeviceToBlockForm = ({
  styles,
  onSubmit,
  onChangeBlock,
  onChangeDevice,
  dropDownBlockValue,
  dropDownBlockChildren,
  dropDownDeviceValue,
  dropDownDeviceChildren,
  formError,
  apiError,
  updateSuccessful
}) => {
  return (
    <form className={styles} onSubmit={onSubmit}>
      <UpdateDropdown
        disabled={true}
        styles={'border rounded-lg shadow-lg cursor-pointer mx-2 my-2'}
        value={dropDownDeviceValue}
        headerValue={''}
        optionHeaderText={'Select Device'}
        sensorData={dropDownDeviceChildren}
        sensorUnassigned={'Unassigned'}
        onChange={onChangeDevice}
      />
      <UpdateBlockDropDown
        styles={'border rounded-lg shadow-lg cursor-pointer mx-2 my-2'}
        value={dropDownBlockValue}
        disabled={true}
        headerValue={''}
        optionHeaderText={'Select Block'}
        blockData={dropDownBlockChildren}
        onChange={onChangeBlock}
      />

      <section className={'grid grid-cols-2 grid-rows-1 items-center mt-2'}>
        <UpdateButton
          style={
            'bg-green-500 w-[150px] h-[45px] text-white rounded-md ml-4 my-2 sm:mt-0'
          }
          type={'submit'}
          text="Update Device Block"
        />
        <UpdateFieldResponse
          styles={`${formError || apiError ? 'text-red-500' : 'text-green-500'} mr-2 text-center`}
          text={updateSuccessful || formError || apiError}
        />
      </section>
    </form>
  );
};

export default AddDeviceToBlockForm;
