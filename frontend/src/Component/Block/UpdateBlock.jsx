import { useState } from "react";
import { useUpdateBlock } from "../../Hooks/Blocks/useUpdateBlock";
import { UpdateBlockForm } from "./UpdateBlockSubComponents/UpdateBlockForm";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
const UpdateBlock = ({onClick, blockName}) => {
    const { items, apiError, resetApiError, updateBlockRequest, updateSuccess, resetUpdateSuccess } = useUpdateBlock(`${apiKey}/api/v1/blocks`);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleInput = (event) => {
        console.log(event.target.value)
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            resetUpdateSuccess();
            resetApiError();
            setError('');


            if (!inputValue || inputValue.startsWith(' ')) {
                return setError('Input field empty.');
            }
            await updateBlockRequest(`${apiKey}/api/v1/blocks`, blockName, inputValue);
        } catch (error) {
            setError(error);
        } finally {
            setInputValue('');
        }
    };

    return (
        <section className={'flex flex-col'}>
            <UpdateBlockForm
            onClick={onClick}
            blockName={blockName}
            onSubmit={handleSubmit}
            onInput={handleInput}
            inputValue={inputValue}
            updateSuccessful={updateSuccess}
            apiError={apiError}
            formError={error}
            />
        </section>
    )
}

export default UpdateBlock;