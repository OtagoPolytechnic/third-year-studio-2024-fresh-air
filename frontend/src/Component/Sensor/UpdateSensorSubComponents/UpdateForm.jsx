import { UpdateDropdown } from "./UpdateDropdown";
import { UpdateInput } from "./UpdateSensorInput";
import { UpdateButton } from "./UpdateButton";
import { UpdateFieldResponse } from "./UpdateFieldResponse";

// This is the main form component for the Update Sensor page
// There is a fair bit of prop drilling (roughly 2 layer depth iirc)
// Could potentially be refactored to use context or redux
// But for now, it is fine as is
// Most of the props are passed from this component to the subcomponents (button, input, dropdown, etc)


export const UpdateForm = ({styles, onSubmit, onChange, onInput, inputValue, dropDownValue, dropDownChildren, formError, apiError, updateSuccessful}) => {
    return (
        <form className={styles} onSubmit={onSubmit}>
        <UpdateDropdown
        styles={'border rounded-lg shadow-lg cursor-pointer mx-2 my-2'}
        onChange={onChange}
        value={dropDownValue}
        disabled={true}
        headerValue={''}
        optionHeaderText={'Select Sensor'}
        sensorData={dropDownChildren}
        sensorUnassigned={'Unassigned'}
        />
      <UpdateInput
      onChange={onInput}
      styles={'border rounded-lg shadow-lg pl-2 mx-2'}
      type={'text'}
      placeholder={'Device Name'}
      value={inputValue}
      />
      <section className={"grid grid-cols-2 grid-rows-1 items-center mt-2"}>
      <UpdateButton style={'bg-green-500 w-[150px] h-[45px] text-white rounded-md ml-4 my-2 sm:mt-0'} type={'submit'} text="Update Name"/>
      <UpdateFieldResponse styles={`${ formError || apiError ? 'text-red-500' : 'text-green-500'} mr-2 text-center`} text={updateSuccessful || formError || apiError}/>
      </section>
    </form>
    )
};