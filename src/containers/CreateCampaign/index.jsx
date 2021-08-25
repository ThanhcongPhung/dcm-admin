import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Step, Stepper, StepLabel } from '@material-ui/core';
import routes from '../../constants/route';
import api from '../../apis';
import { getUrlParams } from '../../utils/object';
import Card from '../../components/Card';
import BaseContents from './BaseContents';
import { CreateCampaignStyled } from './index.style';

const steps = [
  { title: 'createCampaign' },
  { title: 'detailCampaign' },
  { title: 'confirmCampaign' },
];

export default function CreateCampaign() {
  const history = useHistory();
  const location = useLocation();

  const [current, setCurrent] = useState(
    Number(getUrlParams(location.search).step),
  );
  const [services, setServices] = useState([]);
  const [campaignId, setCampaignId] = useState(
    getUrlParams(location.search).campaignId || null,
  );

  const { t } = useTranslation();

  const onNextStep = (id) => {
    setCurrent(current + 1);
    history.push(`/campaigns/create?campaignId=${id}&step=${current + 1}`);
  };
  const onSetCampaignId = (id) => setCampaignId(id);

  const onCancel = () => history.push(routes.CAMPAIGN_MANAGE);

  const fetchServices = async () => {
    const { data } = await api.service.getServices({});
    if (data.status) setServices(data.result.services);
  };

  useEffect(() => {
    fetchServices();
    if (campaignId) {
      history.push(
        `/campaigns/create?campaignId=${campaignId}&step=${current}`,
      );
    } else {
      history.push(`/campaigns/create?step=0`);
    }
  }, [campaignId]);

  return (
    <CreateCampaignStyled>
      <Card flexDirection="column" padding="32px">
        <Stepper activeStep={current}>
          {steps.map((step) => (
            <Step key={step.title}>
              <StepLabel>{t(step.title)}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {current === 0 && (
          <BaseContents
            campaignId={campaignId}
            services={services}
            onSetCampaignId={onSetCampaignId}
            onNextStep={onNextStep}
            onCancel={onCancel}
          />
        )}
      </Card>
    </CreateCampaignStyled>
  );
}
