import { RoutesConfigs } from "@/configs/routes.configs";
import AuthPage from "@/pages/auth";
import DevicePage from "@/pages/device";
import HomePage from "@/pages/home";
import ProjectsManagement from "@/pages/projects-management";

const publicRoutes = [{ path: RoutesConfigs.auth, component: AuthPage }];
const privateRoutes = [
  { path: RoutesConfigs.home, component: HomePage },
  { path: RoutesConfigs.ProjectsManagement, component: ProjectsManagement },
  { path: RoutesConfigs.device, component: DevicePage },
];

export { publicRoutes, privateRoutes };
