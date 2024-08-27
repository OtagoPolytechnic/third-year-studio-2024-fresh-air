import { Homepage } from "../Component/Pages/Homepage";
import { SensorHistory } from "../Component/History/SensorHistory";
import { UpdateSensor } from "../Component/UpdateSensor/UpdateSensor";
import { RoomPage } from "../Component/Pages/Roompage";
import Settings from "../Component/Pages/Settings";

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
        element: <Settings/>
    }
]
