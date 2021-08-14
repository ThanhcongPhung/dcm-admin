import routes from '../constants/route';
import Home from '../pages/Home';
import ServiceManage from '../pages/ServiceManage';

const appRoutes = {
  home: {
    url: routes.HOME,
    component: Home,
    private: true,
  },
  serviceManage: {
    url: routes.SERVICE_MANAGE,
    component: ServiceManage,
    private: true,
  },
};
export default appRoutes;
