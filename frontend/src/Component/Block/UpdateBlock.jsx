import { useState } from "react";
import { useUpdateBlock } from "../../Hooks/Blocks/useUpdateBlock";
import { UpdateBlockForm } from "./UpdateBlockSubComponents/UpdateBlockForm";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
const UpdateBlock = ({onClick}) => {
    const { items, apiError, resetApiError, updateBlockRequest, updateSuccess, resetUpdateSuccess } = useUpdateBlock(`${apiKey}/api/v1/blocks`);
    const [selectedItem, setSelectedItem] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setSelectedItem(event.target.value);
        setInputValue('');
    };

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            resetUpdateSuccess();
            resetApiError();
            setError('');

            if (!selectedItem) {
                return setError('No block selected.');
            }

            if (!inputValue || inputValue.startsWith(' ')) {
                return setError('Input field empty.');
            }
            await updateBlockRequest(`${apiKey}/api/v1/blocks`, selectedItem, inputValue);
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
            onSubmit={handleSubmit}
            onChange={handleChange}
            onInput={handleInput}
            inputValue={inputValue}
            dropDownValue={selectedItem}
            dropDownChildren={items}
            updateSuccessful={updateSuccess}
            apiError={apiError}
            formError={error}
            />
        </section>
    )
}

export default UpdateBlock;