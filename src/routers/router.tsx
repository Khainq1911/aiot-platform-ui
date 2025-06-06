import { RoutesConfigs } from "@/configs/routes.configs";
import AuthPage from "@/pages/auth";
import HomePage from "@/pages/home";

const publicRoutes = [{ path: RoutesConfigs.auth, component: AuthPage }];
const privateRoutes = [{ path: RoutesConfigs.home, component: HomePage }];

export { publicRoutes, privateRoutes };
