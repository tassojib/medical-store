import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CategoryRoutes } from "../modules/Category/category.route";

const router = Router();

// Array of route modules
const routerManager = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
   {
    path: "/category",
    route: CategoryRoutes,
  },
];

// Register routes
routerManager.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;