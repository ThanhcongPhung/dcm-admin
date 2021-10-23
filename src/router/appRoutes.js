import routes from '../constants/route';
import Overview from '../pages/Overview';
import ServiceManage from '../pages/ServiceManage';
import CampaignManage from '../pages/CampaignManage';
import CreateCampaign from '../pages/CreateCampaign';
import ParticipantManage from '../pages/ParticipantManage';
import AudioASRManage from '../pages/AudioASRManage';
import ChatbotCampaignResult from '../pages/ChatbotCampaignResult';

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
};
export default appRoutes;
