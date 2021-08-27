/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { CardActions, Button } from '@material-ui/core';
import { CAMPAIGN_TYPE } from '../../../constants';
import api from '../../../apis';
import DetailCondition from './DetailCondition';

function DetailCampaign({
  campaignId,
  campaignType,
  detailCampaign,
  onSetDetailCampaign,
  onNextStep,
  onPrevStep,
  onCancel,
}) {
  const [campaignIntents, setCampaignIntents] = useState([]);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const checkInValidChatbotUsecase = () =>
    campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE &&
    (!detailCampaign.usecases ||
      (detailCampaign.usecases && !detailCampaign.usecases.length));
  const checkInValidChatbotIntent = () =>
    campaignType === CAMPAIGN_TYPE.CHATBOT_INTENT &&
    (!detailCampaign.intents ||
      (detailCampaign.intents && !detailCampaign.intents.length));

  const saveDetailCampaign = async ({ prevStep, nextStep }) => {
    if (checkInValidChatbotIntent())
      return enqueueSnackbar(t('errorAtLeastOneMoreIntent'), {
        variant: 'error',
      });
    if (checkInValidChatbotUsecase())
      return enqueueSnackbar(t('errorAtLeastOneMoreUsecase'), {
        variant: 'error',
      });

    const { data } = await api.campaign.updateServiceCampaign(
      campaignId,
      detailCampaign,
    );
    if (data.status) {
      onSetDetailCampaign();
      if (nextStep) onNextStep(campaignId);
      if (prevStep) onPrevStep(campaignId);
      return '';
    }
    return enqueueSnackbar(t('errorSave'), { variant: 'error' });
  };

  const handleNextStep = () => saveDetailCampaign({ nextStep: true });
  const handlePrevStep = () => saveDetailCampaign({ prevStep: true });

  const fetchIntents = async (id) => {
    const { data } = await api.campaign.getIntents({ campaignId: id });
    if (data.status) setCampaignIntents(data.result.intents);
  };

  useEffect(() => {
    if (campaignId) fetchIntents(campaignId);
  }, [campaignId]);

  return (
    <>
      <DetailCondition
        campaignType={campaignType}
        campaignIntents={campaignIntents}
        detailCampaign={detailCampaign}
        onSetDetailCampaign={onSetDetailCampaign}
      />
      <CardActions className="cardActions">
        <Button variant="outlined" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button variant="contained" color="primary" onClick={handlePrevStep}>
          {t('back')}
        </Button>
        <Button variant="contained" color="primary" onClick={handleNextStep}>
          {t('next')}
        </Button>
      </CardActions>
    </>
  );
}

export default DetailCampaign;
