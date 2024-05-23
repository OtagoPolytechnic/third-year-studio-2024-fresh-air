import { createBrowserRouter, Outlet} from 'react-router-dom';
import { Layout } from '../Component/Layout/Layout';
import {routes} from './routeList';

const AppLayout = () => {
    return (
    <>
    <Layout/>
    <Outlet/>
    </>
    )
};

const routerConfig = [
    {
        element: <AppLayout/>,
        // errorElement: "ImplementErrorPage",
        children: routes.map((route)=> ({
            path: route.path,
            element: route.element,
        }))
    }
];

const router = createBrowserRouter(routerConfig);

export default router;
