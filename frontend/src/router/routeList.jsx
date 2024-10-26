import { Homepage } from "../Component/Pages/Homepage";
import { RoomPage } from "../Component/Pages/Roompage";
import Settings from "../Component/Pages/Settings";
import { routerLabels } from "../utils/router/routerLabels";
import { LoginPage } from "../Component/Pages/Loginpage";
import DashBoard from "../Component/Pages/Dashboard";
import Logout from "../Component/Auth/Logout";
import BlockPage from "../Component/Pages/BlockPage";

export const routes = [
    {
        path: "/",
        label: routerLabels.home,
        element: <Homepage/>
    },
    {
        path: "/:blockName/:roomNumber",
        label: routerLabels.block,
        element: <RoomPage/>
    },
    {
        path: "/:blockName",
        label: routerLabels.blockName,
        element: <BlockPage/>
    },
    {
        path:"/settings",
        label: routerLabels.settings,
        element: <Settings/>
    },
      {
        path: "/login",
        label: routerLabels.login,
        element: <LoginPage/>
    },
    {
        path: "/admin",
        label: routerLabels.dashboard,
        element: <DashBoard/>
    },
    {
        path: "/logout",
        label: routerLabels.logout,
        element: <Logout/>
    }
    
]
