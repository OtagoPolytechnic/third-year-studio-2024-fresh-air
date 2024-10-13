import { UpdateSensor } from '../Sensor/UpdateSensor';
import { AddSensor } from '../Sensor/AddSensor';
import Register from '../Auth/Register';
import CreateBlock from '../Block/CreateBlock';
import UpdateBlock from '../Block/UpdateBlock';
import AddDeviceToBlock from '../Block/AddDeviceToBlock';


const DashBoard = () => {
  return (
    <>
    <section className="lg:mx-16 mx-4 justify-center items-center grid grid-cols-2 lg:grid-cols-6 grid-rows-3">
      <AddSensor styles={'lg:col-start-1 lg:col-span-2 col-start-1 col-span-2'} />
      <UpdateSensor styles={'lg:col-start-4 lg:row-start-1 lg:col-span-3 col-start-1 col-span-3'} />
      {/* <Register styles={'lg:col-start-1 lg:row-start-2 lg:col-span-3 col-start-1 col-span-full'} /> */}
      <CreateBlock styles={'lg:col-start-4 lg:row-start-4 lg:col-span-2 col-start-1 col-span-3'} />
      <UpdateBlock styles={'lg:col-start-4 lg:row-start-3 lg:col-span-2 col-start-1 col-span-3'}/>
      <AddDeviceToBlock styles={'lg:col-start-4 lg:row-start-2 lg:col-span-2 col-start-1 col-span-3'}/>
    </section>
    </>
  );
};

export default DashBoard;
