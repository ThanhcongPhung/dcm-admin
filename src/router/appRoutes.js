import routes from '../constants/route';
import Home from '../pages/Home';
import ServiceManage from '../pages/ServiceManage';
import CampaignManage from '../pages/CampaignManage';
import CreateCampaign from '../pages/CreateCampaign';

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
  createCampaign: {
    url: routes.CREATE_CAMPAIGN,
    component: CreateCampaign,
    private: true,
  },
};
export default appRoutes;
