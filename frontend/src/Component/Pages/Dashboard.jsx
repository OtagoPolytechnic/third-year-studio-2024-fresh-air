import { UpdateSensor } from '../Sensor/UpdateSensor';
import { AddSensor } from '../Sensor/AddSensor';

const DashBoard = () => {
  return (
    <section className="lg:mx-16 mx-4 mt-60 justify-center items-center grid grid-cols-2 lg:grid-cols-8 grid-rows-6">
      <AddSensor styles={'col-start-1 row-start-1 col-span-5'} />
      <UpdateSensor styles={'col-start-1 row-start-3 col-span-5'} />
    </section>
  );
};

export default DashBoard;
