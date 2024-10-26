import { UpdateButton } from "../Sensor/UpdateSensorSubComponents/UpdateButton";

const AdminPanel = () => {
    return (
        <>
        <section className={'flex justify-end items-center mt-4 mx-4 mb-2'}>
            <UpdateButton style={'px-4 py-2 text-white bg-blue-500 rounded-lg mx-2'} type={'button'} text={'Update User'}/>
            <UpdateButton style={'px-4 py-2 text-white bg-blue-500 rounded-lg'} type={'button'} text={'Update Device'}/>
        </section>
        </>
    );
}

export default AdminPanel;