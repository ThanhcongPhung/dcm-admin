import React from 'react';
import { CAMPAIGN_TYPE } from '../../../constants';
import DetailIntent from '../Chatbot/DetailIntent';
import DetailUsecase from '../Chatbot/DetailUsecase';
import FAQCampaign from '../FAQ/CreateFAQCampaign';

const DETAIL_CAMPAIGN = {
  INTENTS: 'intents',
  USECASES: 'usecases',
};

export default function DetailCondition({
  campaignType,
  campaignIntents,
  detailCampaign,
  onSetDetailCampaign,
  campaignActions,
}) {
  switch (campaignType) {
    case CAMPAIGN_TYPE.CHATBOT_INTENT: {
      let tempIntents = campaignIntents;
      const validIntents =
        detailCampaign &&
        detailCampaign.intents &&
        detailCampaign.intents.length;
      if (validIntents)
        tempIntents = tempIntents.filter((intent) =>
          detailCampaign.intents.every((item) => item.id !== intent.id),
        );
      const onSetCampIntents = (value) => {
        onSetDetailCampaign(DETAIL_CAMPAIGN.INTENTS, value);
      };
      return (
        <DetailIntent
          chooseIntents={tempIntents}
          currentIntents={(detailCampaign && detailCampaign.intents) || []}
          onSetCurrentIntents={onSetCampIntents}
        />
      );
    }
    case CAMPAIGN_TYPE.CHATBOT_USECASE: {
      const onSetCampUsecase = (value) => {
        onSetDetailCampaign(DETAIL_CAMPAIGN.USECASES, value);
      };
      return (
        <DetailUsecase
          campaignIntents={campaignIntents}
          campUsecases={(detailCampaign && detailCampaign.usecases) || []}
          onSetCampUsecases={onSetCampUsecase}
        />
      );
    }
    case CAMPAIGN_TYPE.FAQ: {
      return (
        <FAQCampaign
          detailCampaign={detailCampaign}
          onSetDetailCampaign={onSetDetailCampaign}
          campaignActions={campaignActions}
        />
      );
    }
    default:
      return <div> default </div>;
  }
}
