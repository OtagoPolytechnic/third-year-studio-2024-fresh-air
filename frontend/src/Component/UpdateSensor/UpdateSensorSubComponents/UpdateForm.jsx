import { UpdateDropdown } from "./UpdateDropdown";
import { UpdateInput } from "./UpdateSensorInput";
import { UpdateButton } from "./UpdateButton";
import { Error } from "./Error";

export const UpdateForm = ({styles, onSubmit, onChange, onInput, inputValue, dropDownValue, dropDownChildren, formError, apiError}) => {
    return (
        <form className={styles} onSubmit={onSubmit}>
             <UpdateDropdown
        styles={'border rounded-lg shadow-lg cursor-pointer'}
        onChange={onChange}
        value={dropDownValue}
        disabled={true}
        headerValue={''}
        optionHeaderText={'Select Sensor'}
        children={dropDownChildren}
        childrenUnassigned={'Unassigned'}
        />
      <UpdateInput
      onChange={onInput}
      styles={'border rounded-lg shadow-lg pl-2'}
      type={'text'}
      placeholder={'Device Name'}
      value={inputValue}
      />
      <section className={"grid grid-cols-2 grid-rows-1 items-center"}>
      <UpdateButton style={'bg-green-500 w-[150px] h-[50px] text-white rounded-md mt-2 ml-4 mb-2'} type={'submit'} text="Update Name"/>
      <Error
      children={formError || apiError}
      />
      </section>
    </form>
    )
};