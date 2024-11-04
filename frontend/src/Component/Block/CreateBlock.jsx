import { useState } from "react";
import { useCreateBlock } from "../../Hooks/Blocks/useCreateBlock";
import CreateBlockForm from "./CreateBlockForm";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const CreateBlock = ({onClick}) => {
    const { apiError, resetApiError, CreateBlockRequest, updateSuccess, resetUpdateSuccess } = useCreateBlock(`${apiKey}/api/v1/blocks`);
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
        setInputValue(event.target.value);
    };

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
                Register New Block
              </h2>

        <section className={'flex flex-col'}>
            <CreateBlockForm
            onSubmit={handleSubmit}
            onInput={handleChange}
            inputValue={inputValue}
            formError={error}
            apiError={apiError}
            updateSuccessful={updateSuccess}
            onClick={onClick}
            />
            </section>
        </div>
        </div>
        </div>

    );
}

export default CreateBlock;