import { RoutesConfigs } from "@/configs/routes.configs";
import AuthPage from "@/pages/auth";
import DevicePage from "@/pages/device";
import HomePage from "@/pages/home";
import NotificationPage from "@/pages/notification";
import ProjectsManagement from "@/pages/projects-management";
import SubDevicePage from "@/pages/sub-device";

const publicRoutes = [{ path: RoutesConfigs.auth, component: AuthPage }];
const privateRoutes = [
  { path: RoutesConfigs.home, component: HomePage },
  { path: RoutesConfigs.ProjectsManagement, component: ProjectsManagement },
  { path: RoutesConfigs.device, component: DevicePage },
  { path: RoutesConfigs.subDevice, component: SubDevicePage },
  { path: RoutesConfigs.notification, component: NotificationPage },
];

export { publicRoutes, privateRoutes };
