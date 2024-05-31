import { Homepage } from "../Component/Pages/Homepage";
import { SensorHistory } from "../Component/SensorHistory";
import { UpdateSensor } from "../Component/UpdateSensor/UpdateSensor";
import { RoomPage } from "../Component/Pages/Roompage";

export const routes = [
    {
        path: "/",
        label: 'Home',
        element: <Homepage/>
    },
    {
        path: "/D-Block/:roomNumber",
        label: "Room",
        element: <RoomPage/>
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
