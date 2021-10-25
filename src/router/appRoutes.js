import routes from '../constants/route';
import Overview from '../pages/Overview';
import ServiceManage from '../pages/ServiceManage';
import CampaignManage from '../pages/CampaignManage';
import CreateCampaign from '../pages/CreateCampaign';
import ParticipantManage from '../pages/ParticipantManage';
import AudioASRManage from '../pages/AudioASRManage';
import ChatbotCampaignResult from '../pages/ChatbotCampaignResult';
import CategoryManage from '../pages/FAQ/CategoryManage';
import CategoryCreate from '../pages/FAQ/CategoryCreate';
import CategoryEdit from '../pages/FAQ/CategoryEdit';

const appRoutes = {
  home: {
    url: routes.OVERVIEW,
    component: Overview,
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
  participants: {
    url: routes.CAMPAIGN_PARTICIPANT,
    component: ParticipantManage,
    private: true,
  },
  audioASRManage: {
    url: routes.AUDIO_MANAGE,
    component: AudioASRManage,
    private: true,
  },
  chatbotCampaignResult: {
    url: routes.CHATBOT_CAMPAIGN_RESULT,
    component: ChatbotCampaignResult,
    private: true,
  },
  intentCategory: {
    url: routes.FAQ_INTENT_CATEGORIES,
    component: CategoryManage,
    private: true,
  },
  intentCategoryCreate: {
    url: routes.FAQ_INTENT_CATEGORIES_CREATE,
    component: CategoryCreate,
    private: true,
  },
  intentCategoryEdit: {
    url: routes.FAQ_INTENT_CATEGORIES_EDIT,
    component: CategoryEdit,
    private: true,
  },
};
export default appRoutes;
