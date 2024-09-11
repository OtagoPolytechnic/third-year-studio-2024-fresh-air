import { UpdateSensor } from "../UpdateSensor/UpdateSensor";

const DashBoard = () => {
    return (
        <section className="justify-center items-center grid grid-cols-8 grid-rows-6 ">
            <UpdateSensor styles={'col-start-1 row-start-2 col-span-5'}/>
        </section>
    )
};

export default DashBoard;