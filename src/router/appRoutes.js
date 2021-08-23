import routes from '../constants/route';
import Home from '../pages/Home';
import ServiceManage from '../pages/ServiceManage';
import CampaignManage from '../pages/CampaignManage';

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
  campaignManage: {
    url: routes.CAMPAIGN_MANAGE,
    component: CampaignManage,
    private: true,
  },
};
export default appRoutes;
