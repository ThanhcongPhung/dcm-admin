import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Step, Stepper, StepLabel } from '@material-ui/core';
import routes from '../../constants/route';
import api from '../../apis';
import { getUrlParams } from '../../utils/object';
import Card from '../../components/Card';
import BaseContents from './BaseContents';
import CampaignDetail from './CampaignDetail';
import { CreateCampaignStyled } from './index.style';

const stepTitles = ['createCampaign', 'detailCampaign', 'confirmCampaign'];

export default function CreateCampaign() {
  const history = useHistory();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [campaignId, setCampaignId] = useState();
  const [campaignType, setCampaignType] = useState();
  const [detailCampaign, setDetailCampaign] = useState({});

  const { t } = useTranslation();

  const onSetCampaignId = (id) => setCampaignId(id);
  const onSetDetailCampaign = (name, value) =>
    setDetailCampaign((prev) => ({ ...prev, [name]: value }));

  const onNextStep = (id) => {
    setStep(step + 1);
    history.push(`/campaigns/create?campaignId=${id}&step=${step + 1}`);
  };
  const onPrevStep = (id) => {
    setStep(step - 1);
    history.push(`/campaigns/create?campaignId=${id}&step=${step - 1}`);
  };
  const onCancel = () => history.push(routes.CAMPAIGN_MANAGE);

  const fetchServices = async () => {
    const { data } = await api.service.getServices({});
    if (data.status) setServices(data.result.services);
  };

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) {
      setCampaignType(data.result.campaignType);
      setDetailCampaign(data.result.detailCampaign);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (campaignId) fetchCampaign();
  }, [campaignId]);

  useEffect(() => {
    const { campaignId: paramCampaignId, step: paramStep } = getUrlParams(
      location.search,
    );
    setCampaignId(paramCampaignId);
    setStep(Number(paramStep));

    if (paramCampaignId) {
      history.push(
        `/campaigns/create?campaignId=${paramCampaignId}&step=${paramStep}`,
      );
    } else {
      history.push(`/campaigns/create?step=0`);
    }
  }, [location.search]);

  return (
    <CreateCampaignStyled>
      <Card flexDirection="column" padding="32px">
        <Stepper activeStep={step}>
          {stepTitles.map((title) => (
            <Step key={title}>
              <StepLabel>{t(title)}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step === 0 && (
          <BaseContents
            campaignId={campaignId}
            services={services}
            onSetCampaignId={onSetCampaignId}
            onNextStep={onNextStep}
            onCancel={onCancel}
          />
        )}
        {step === 1 && (
          <CampaignDetail
            campaignId={campaignId}
            campaignType={campaignType}
            detailCampaign={detailCampaign}
            onSetDetailCampaign={onSetDetailCampaign}
            onPrevStep={onPrevStep}
            onCancel={onCancel}
          />
        )}
      </Card>
    </CreateCampaignStyled>
  );
}
