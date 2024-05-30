import { Homepage } from "../Component/Pages/Homepage";
import { SensorHistory } from "../Component/SensorHistory";
import { UpdateSensor } from "../Component/UpdateSensor/UpdateSensor";

export const routes = [
    {
        path: "/",
        label: 'Home',
        element: <Homepage/>
    },
    {
        path: "/SensorHistory",
        label: "History",
        element: <SensorHistory/>
    },
    {
        path: "/UpdateSensor",
        label: "Update",
        element: <UpdateSensor/>
    }
]
