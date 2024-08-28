import { routerLabels } from "./routerLabels";

// Filtering the router to remove the block route
export const filterRouter = (router) => {
  return router.filter((route) => route.label !== routerLabels.block);
};