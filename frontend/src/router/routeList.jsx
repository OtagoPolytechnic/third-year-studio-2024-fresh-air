import { Homepage } from "../Component/Pages/Homepage";
import { RoomPage } from "../Component/Pages/Roompage";
import Settings from "../Component/Pages/Settings";
import { routerLabels } from "../utils/router/routerLabels";
import { LoginPage } from "../Component/Pages/Loginpage";
import Admin from "../Component/Pages/Admin";
import Devices from "../Component/Pages/Devices";
import Blocks from "../Component/Pages/Blocks";
import Users from "../Component/Pages/Users";
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
        path: "/login",
        label: routerLabels.login,
        element: <LoginPage/>
    },
    {
        path: "/admin",
        label: routerLabels.admin,
        element: <Admin/>
    },
    {
        path: "/admin/blocks",
        label: routerLabels.blocks,
        element: <Blocks/>
    },
    {
        path: "/admin/users",
        label: routerLabels.users,
        element: <Users/>
    },
    {
        path: "/admin/devices",
        label: routerLabels.devices,
        element: <Devices/>
    },
    {
        path:"/settings",
        label: routerLabels.settings,
        element: <Settings/>
    },
    {
        path: "/logout",
        label: routerLabels.logout,
        element: <Logout/>
    }
    
]
