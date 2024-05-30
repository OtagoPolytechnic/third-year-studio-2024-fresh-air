import { Homepage } from "../Component/Pages/Homepage";
import { RoomPage } from "../Component/Pages/Roompage";
import { SensorHistory } from "../Component/SensorHistory";
import { UpdateSensor } from "../Component/UpdateSensor/UpdateSensor";

export const routes = [
    {
        path: "/",
        label: 'Home',
        element: <Homepage/>
    },
    {
        path: "/D-block/:roomNumber",
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