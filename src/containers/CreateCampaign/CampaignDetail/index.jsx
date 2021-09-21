/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { CardActions, Button } from '@material-ui/core';
import { CAMPAIGN_TYPE } from '../../../constants';
import api from '../../../apis';
import DetailCondition from './DetailCondition';
import BackConfirm from './BackConfirm';

function DetailCampaign({
  campaignId,
  campaignType,
  detailCampaign,
  onSetDetailCampaign,
  onPrevStep,
  onCancel,
}) {
  const [campaignIntents, setCampaignIntents] = useState([]);
  const [isPrev, setIsPrev] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const checkInValidChatbotUsecase = () =>
    campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE &&
    (!detailCampaign ||
      !detailCampaign.usecases ||
      (detailCampaign.usecases && !detailCampaign.usecases.length));
  const checkInValidChatbotIntent = () =>
    campaignType === CAMPAIGN_TYPE.CHATBOT_INTENT &&
    (!detailCampaign ||
      !detailCampaign.intents ||
      (detailCampaign.intents && !detailCampaign.intents.length));

  const saveDetailCampaign = async ({ prevStep, save }) => {
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
      if (save) {
        onCancel();
        enqueueSnackbar(t('saveCampaignSuccess'), { variant: 'success' });
      }
      if (prevStep) onPrevStep(campaignId);
      return '';
    }
    return enqueueSnackbar(t('saveCampaignError'), { variant: 'error' });
  };

  const handleSave = () => saveDetailCampaign({ save: true });

  const handlePrevStepAndNotSave = () => {
    setIsPrev(false);
    onPrevStep(campaignId);
  };
  const handlePrevStepAndSave = () => {
    setIsPrev(false);
    saveDetailCampaign({ prevStep: true });
  };

  const fetchIntents = async () => {
    const { data } = await api.campaign.getIntents(campaignId);
    if (data.status) setCampaignIntents(data.result.intents);
  };

  useEffect(() => {
    if (campaignId) fetchIntents();
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsPrev(true)}
        >
          {t('back')}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {t('save')}
        </Button>
      </CardActions>
      <BackConfirm
        open={isPrev}
        handleClose={() => setIsPrev(false)}
        handlePrevStepAndNotSave={handlePrevStepAndNotSave}
        handlePrevStepAndSave={handlePrevStepAndSave}
      />
    </>
  );
}

export default DetailCampaign;
