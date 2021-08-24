import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip, IconButton, Icon } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { CAMPAIGN_STATUS } from '../../constants';
import { ShowStatusStyled } from './index.style';

export default function ShowStatus({ campaignId, status, onChangeStatus }) {
  const { t } = useTranslation();

  const changeStatus = (currentStatus) => {
    switch (currentStatus) {
      case CAMPAIGN_STATUS.WAITING:
        return (
          <div className="button-status">
            <Tooltip title={t('clickToStart')}>
              <IconButton
                onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.RUNNING)}
                className="iconButton"
              >
                <PlayCircleFilledWhiteIcon className="start" />
              </IconButton>
            </Tooltip>
          </div>
        );
      case CAMPAIGN_STATUS.RUNNING:
        return (
          <div className="button-status">
            <Tooltip title={t('clickToPause')}>
              <IconButton
                onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.PAUSE)}
                className="iconButton"
              >
                <PauseIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('clickToEnd')}>
              <IconButton
                onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.END)}
                className="iconButton"
              >
                <Icon color="primary">stop_circle</Icon>
              </IconButton>
            </Tooltip>
          </div>
        );
      case CAMPAIGN_STATUS.PAUSE:
        return (
          <div className="button-status">
            <Tooltip title={t('clickToContinue')}>
              <IconButton
                onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.RUNNING)}
                className="iconButton"
              >
                <PlayArrowIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('clickToEnd')}>
              <IconButton
                onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.END)}
                className="iconButton"
              >
                <Icon color="primary">stop_circle</Icon>
              </IconButton>
            </Tooltip>
          </div>
        );
      default:
        return <div />;
    }
  };

  return <ShowStatusStyled>{changeStatus(status)}</ShowStatusStyled>;
}
