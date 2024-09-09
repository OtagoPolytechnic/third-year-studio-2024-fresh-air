import { Homepage } from "../Component/Pages/Homepage";
import { SensorHistory } from "../Component/History/SensorHistory";
import { UpdateSensor } from "../Component/UpdateSensor/UpdateSensor";
import { RoomPage } from "../Component/Pages/Roompage";
import Settings from "../Component/Pages/Settings";
import { routerLabels } from "../utils/router/routerLabels";
import { LoginPage } from "../Component/Pages/Loginpage";

export const routes = [
    {
        path: "/",
        label: routerLabels.home,
        element: <Homepage/>
    },
    {
        path: "/D-Block/:roomNumber",
        label: routerLabels.block,
        element: <RoomPage/>
    },
    {
        path:"/settings",
        label: routerLabels.settings,
        element: <Settings/>
    },
      {
        path: "/login",
        label: 'Login',
        element: <LoginPage/>
    }
]
