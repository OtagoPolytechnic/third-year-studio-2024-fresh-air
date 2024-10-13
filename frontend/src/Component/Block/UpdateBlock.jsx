import { useState } from "react";
import { useUpdateBlock } from "../../Hooks/Blocks/useUpdateBlock";
import { UpdateForm } from "../Sensor/UpdateSensorSubComponents/UpdateForm";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
const UpdateBlock = () => {
    const { items, apiError, resetApiError, updateBlockRequest, updateSuccess, resetUpdateSuccess } = useUpdateBlock(`${apiKey}/api/v1/blocks`);
    console.log(items);
    return (
        <div>
            {items.length > 0 && (
                <UpdateForm
                styles={'flex flex-col'}
                // onSubmit={handleSubmit}
                // onChange={handleChange}
                // onInput={handleInput}
                // dropDownValue={selectedItem}
                dropDownChildren={items}
                />
            )}
        </div>
    )
}

export default UpdateBlock;