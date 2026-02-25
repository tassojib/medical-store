import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

// Array of route modules
const routerManager = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

// Register routes
routerManager.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;