import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip, IconButton, Icon } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { CAMPAIGN_STATUS } from '../../constants';
import { ShowStatusStyled } from './index.style';

export default function ShowStatus({ campaignId, status, onChangeStatus }) {
  const { t } = useTranslation();

  const contentStart = () => {
    if (status === CAMPAIGN_STATUS.WAITING) return 'clickToStart';
    if (status === CAMPAIGN_STATUS.PAUSE) return 'clickToContinue';
    return '';
  };

  const validStart = [CAMPAIGN_STATUS.WAITING, CAMPAIGN_STATUS.PAUSE].includes(
    status,
  );
  const validEnd = [CAMPAIGN_STATUS.RUNNING, CAMPAIGN_STATUS.PAUSE].includes(
    status,
  );

  return (
    <ShowStatusStyled>
      <Tooltip title={t(contentStart())}>
        <IconButton
          onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.RUNNING)}
          classes={{ root: 'iconButton' }}
          disabled={!validStart}
        >
          <PlayCircleFilledWhiteIcon color={validStart ? 'primary' : ''} />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('clickToPause')}>
        <IconButton
          onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.PAUSE)}
          classes={{ root: 'iconButton' }}
          disabled={status !== CAMPAIGN_STATUS.RUNNING}
        >
          <PauseIcon
            color={status === CAMPAIGN_STATUS.RUNNING ? 'primary' : ''}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('clickToEnd')}>
        <IconButton
          onClick={onChangeStatus(campaignId, CAMPAIGN_STATUS.END)}
          classes={{ root: 'iconButton' }}
          disabled={!validEnd}
        >
          <Icon color={validEnd ? 'primary' : ''}>stop_circle</Icon>
        </IconButton>
      </Tooltip>
    </ShowStatusStyled>
  );
}
