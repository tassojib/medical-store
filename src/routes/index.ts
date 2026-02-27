import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { SellerRoutes } from "../modules/Seller/seller.route";

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
     {
    path: "/seller",
    route: SellerRoutes,
  },
];

// Register routes
routerManager.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;