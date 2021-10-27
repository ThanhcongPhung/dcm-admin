import React, { useState } from 'react';
import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Add } from '@material-ui/icons';
import { ScenarioManageStyled } from './index.style';
import ScenarioTable from './ScenarioTable';
import ScenarioForm from './ScenarioForm';

export default function ScenarioManage() {
  const [isCreate, setIsCreate] = useState(false);

  const { t } = useTranslation();

  const onCancelShowService = () => {
    setIsCreate(false);
  };

  return (
    <ScenarioManageStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t('scenarioASRManage')}
          </Typography>
          <div className="headButtons">
            <Tooltip title={t('createCampaign')}>
              <IconButton
                className="iconButton"
                onClick={() => setIsCreate(true)}
              >
                <Add className="addIcon" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="campaignTable">
          <ScenarioTable />
        </div>
        <div className="pagination" />
      </Paper>
      <ScenarioForm open={isCreate} handleClose={onCancelShowService} />
    </ScenarioManageStyled>
  );
}
