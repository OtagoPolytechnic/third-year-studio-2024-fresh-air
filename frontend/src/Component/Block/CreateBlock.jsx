import { useState, useEffect } from "react";
import CreateBlockForm from "./CreateBlockForm";
import { useCreateBlock } from "../../Hooks/Blocks/useCreateBlock";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const CreateBlock = ({styles}) => {
    const { items, apiError, resetApiError, CreateBlockRequest, updateSuccess, resetUpdateSuccess } = useCreateBlock(`${apiKey}/api/v1/blocks`);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            resetUpdateSuccess();
            resetApiError();
            setError('');

            if (!inputValue || inputValue.startsWith(' ')) {
                return setError('Input field empty.');
            }
            await CreateBlockRequest(`${apiKey}/api/v1/blocks`, inputValue);
        } catch (error) {
            setError(error);
        } finally {
            setInputValue('');
        }
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setInputValue(event.target.value);
    };

    return (
        <section className={styles}>
            <div className={'border rounded-lg shadow-lg max-w-lg bg-gray-200'}>
            <h1 className={'ml-2 text-center font-bold'}>Create Block</h1>
            <CreateBlockForm
            styles={'flex flex-col'}
            onSubmit={handleSubmit}
            onInput={handleChange}
            inputValue={inputValue}
            formError={error}
            apiError={apiError}
            updateSuccessful={updateSuccess}
            />
            </div>
            </section>
    );
}

export default CreateBlock;