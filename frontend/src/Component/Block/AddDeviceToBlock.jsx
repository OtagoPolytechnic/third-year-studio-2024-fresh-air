import {useState, useEffect} from 'react';
import { useGetDeviceList } from '../../Hooks/Devices/useGetDeviceList';
import { useGetBlockList } from '../../Hooks/Blocks/useGetBlockList';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const AddDeviceToBlock = () => {
    const { devices, apiError } = useGetDeviceList(`${apiKey}/api/v1/devices`);
    const { blocks, blockError } = useGetBlockList(`${apiKey}/api/v1/blocks`);

    return (
        <>
        {devices && blocks && (
            <>
            {devices.map((device) => (
                <div key={device.id}>
                    <p>{`${device.room_number} [${device.blockName}]`}</p>
                </div>
            ))}

            {blocks.map((block) => (
                <div key={block.id}>
                    <p>{block.blockName}</p>
                </div>
            ))}
            </>
        )}
        
        </>
    );
};

export default AddDeviceToBlock;