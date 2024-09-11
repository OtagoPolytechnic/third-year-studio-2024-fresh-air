import { UpdateSensor } from "../UpdateSensor/UpdateSensor";

const DashBoard = () => {
    return (
        <section className="mx-16 mt-60 justify-center items-center grid grid-cols-8 grid-rows-6">
            <UpdateSensor styles={'col-start-4 row-start-5 col-span-5'}/>
        </section>
    )
};

export default DashBoard;