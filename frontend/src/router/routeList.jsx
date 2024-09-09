import { Homepage } from "../Component/Pages/Homepage";
import { SensorHistory } from "../Component/History/SensorHistory";
import { UpdateSensor } from "../Component/UpdateSensor/UpdateSensor";
import { RoomPage } from "../Component/Pages/Roompage";
import { LoginPage } from "../Component/Pages/Loginpage";

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
        path: "/login",
        label: 'Login',
        element: <LoginPage/>
    }
]
