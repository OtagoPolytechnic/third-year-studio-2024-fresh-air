import {useState, useEffect} from 'react';
import { useGetDeviceList } from '../../Hooks/Devices/useGetDeviceList';
import { useGetBlockList } from '../../Hooks/Blocks/useGetBlockList';
import AddDeviceToBlockForm from './AddDeviceToBlockForm';
import { useAddDeviceToBlock } from '../../Hooks/Devices/useAddDeviceToBlock';
const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const AddDeviceToBlock = ({styles}) => {
    const { devices, apiError } = useGetDeviceList(`${apiKey}/api/v1/devices`);
    const { blocks, blockError } = useGetBlockList(`${apiKey}/api/v1/blocks`);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');
    const { addDeviceToBlockRequest, resetApiError, resetUpdateSuccess, updateSuccess } = useAddDeviceToBlock(`${apiKey}/api/v1/blocks`);
    const [error, setError] = useState('');

    
    const handleDeviceChange = (event) => {
        console.log(event.target.value);
        setSelectedDevice(event.target.value);
    };

    const handleBlockChange = (event) => {
        setSelectedBlock(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        try {
            resetUpdateSuccess();
            resetApiError();
            setError('');

            if (!devices) {
                return setError('No device selected.');
            }

            if (!blocks) {
                return setError('No block selected.');
            }

            await addDeviceToBlockRequest(`${apiKey}/api/v1/devices`, selectedBlock, selectedDevice);
        } catch (error) {
            setError(error);
        }
    };

    
    return (
        <section className={styles}>
            <div className={'border rounded-lg shadow-lg max-w-lg bg-gray-200'}>
            <h1 className={'ml-2 text-center font-bold'}>Add Block to Device</h1>
        <AddDeviceToBlockForm 
        styles="flex flex-col"
        onChangeDevice={handleDeviceChange}
        onChangeBlock={handleBlockChange}
        dropDownBlockChildren={blocks}
        dropDownBlockValue={blocks.blockName}
        dropDownDeviceChildren={devices}
        dropDownDeviceValue={devices.room_number}
        onSubmit={handleSubmit}
        formError={error}
        apiError={apiError || blockError}
        updateSuccessful={updateSuccess}

        />
        </div>
        </section>
    );
};

export default AddDeviceToBlock;