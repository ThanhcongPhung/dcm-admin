import React from 'react';
import { CAMPAIGN_TYPE } from '../../../constants';
import DetailIntent from '../Chatbot/DetailIntent';
import DetailUsecase from '../Chatbot/DetailUsecase';

const DETAIL_CAMPAIGN = {
  INTENTS: 'intents',
  USECASES: 'usecases',
};

export default function DetailCondition({
  campaignType,
  campaignIntents,
  detailCampaign,
  onSetDetailCampaign,
}) {
  switch (campaignType) {
    case CAMPAIGN_TYPE.CHATBOT_INTENT: {
      let tempIntents = campaignIntents;
      if (detailCampaign.intents && detailCampaign.intents.length) {
        tempIntents = tempIntents.filter((intent) =>
          detailCampaign.intents.every((item) => item.id !== intent.id),
        );
      }
      const onSetCampIntents = (value) => {
        onSetDetailCampaign(DETAIL_CAMPAIGN.INTENTS, value);
      };
      return (
        <DetailIntent
          chooseIntents={tempIntents}
          currentIntents={detailCampaign.intents || []}
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
          campUsecases={detailCampaign.usecases || []}
          onSetCampUsecases={onSetCampUsecase}
        />
      );
    }
    default:
      return <div />;
  }
}
