import router from "../../router/router";
import { routerLabels } from "./routerLabels";

// These routes are not displayed when user is authenticated
const excludedRoutesForAuthenticated = [routerLabels.login, routerLabels.block, routerLabels.blockName, routerLabels.blocks, routerLabels.devices, routerLabels.users];

// These routes are not displayed when user is not authenticated
const excludedRoutesForUnAuthenticated = [
  routerLabels.logout,
  routerLabels.admin,
  routerLabels.block,
  routerLabels.blockName,
  routerLabels.blocks,
  routerLabels.devices,
  routerLabels.users,
];

// Filter the routes based on the user's authentication status
export const filterRouter = (router, user) => {
  const excludedRoutes = user ? excludedRoutesForAuthenticated : excludedRoutesForUnAuthenticated;
  return router.filter((route) => !excludedRoutes.includes(route.label));
}