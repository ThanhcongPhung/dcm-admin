import React from 'react';
import { CAMPAIGN_TYPE } from '../../../constants';
import DetailIntent from '../Chatbot/DetailIntent';
import DetailUsecase from '../Chatbot/DetailUsecase';
import FAQCampaign from '../FAQ/CreateFAQCampaign';
import DetailValidASR from '../AudioChatASR/DetailValidASR';
import DetailCollectASR from '../AudioChatASR/DetailCollectASR';

const DETAIL_CAMPAIGN = {
  INTENTS: 'intents',
  USECASES: 'usecases',
  VALID_AUDIO_ROOM: 'valid_audio_room',
  COLLECTION_AUDIO: 'collection_audio',
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
    case CAMPAIGN_TYPE.ASR_COLLECTION: {
      const onSetCollectAudio = (value) => {
        onSetDetailCampaign(DETAIL_CAMPAIGN.COLLECTION_AUDIO, value);
      };
      return (
        <DetailCollectASR
          currentScenario={
            (detailCampaign && detailCampaign.collection_audio) || []
          }
          onSetCollectAudio={onSetCollectAudio}
        />
      );
    }
    case CAMPAIGN_TYPE.ASR_VALIDATION: {
      const onSetValidRoom = (value) => {
        onSetDetailCampaign(DETAIL_CAMPAIGN.VALID_AUDIO_ROOM, value);
      };
      return <DetailValidASR onSetValidRoom={onSetValidRoom} />;
    }
    default:
      return <div />;
  }
}
