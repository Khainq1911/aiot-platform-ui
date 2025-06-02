import { RoutesConfigs } from "./configs/routes.configs";
import AuthPage from "./pages/auth";

const publicRoutes = [{ path: RoutesConfigs.auth, component: AuthPage }];

export { publicRoutes };
