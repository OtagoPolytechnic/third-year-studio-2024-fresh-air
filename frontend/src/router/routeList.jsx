import { Homepage } from "../Component/Pages/Homepage";
import { SensorHistory } from "../Component/History/SensorHistory";
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
        element: <RoomPage/>
    },
    {
        path:"/settings",
        label: "Settings",
        element: <Homepage/>
    }
]
