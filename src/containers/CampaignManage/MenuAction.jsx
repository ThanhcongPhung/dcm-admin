import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon, MenuItem } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { CAMPAIGN_STATUS, CAMPAIGN_TYPE } from '../../constants';
import { MenuActionStyled } from './index.style';

export default function MenuAction({
  status,
  onChangeStatus,
  onClickDelete,
  campaign,
}) {
  const history = useHistory();
  const { t } = useTranslation();

  const validStart = [CAMPAIGN_STATUS.WAITING, CAMPAIGN_STATUS.PAUSE].includes(
    status,
  );
  const validEnd = [CAMPAIGN_STATUS.RUNNING, CAMPAIGN_STATUS.PAUSE].includes(
    status,
  );
  const handleCampaignResult = () => {
    const campaignType = campaign && campaign.campaignType;
    const campaignId = campaign && campaign.id;
    switch (campaignType) {
      case CAMPAIGN_TYPE.CHATBOT_USECASE:
      case CAMPAIGN_TYPE.CHATBOT_INTENT:
        history.push(`/admin/campaigns/${campaignId}/chatbot/result`);
        break;
      default:
    }
  };

  return (
    <MenuActionStyled>
      {validStart && (
        <MenuItem
          className="dropdownItem"
          onClick={onChangeStatus(CAMPAIGN_STATUS.RUNNING)}
        >
          <PlayCircleFilledWhiteIcon
            color={validStart ? 'primary' : ''}
            className="iconAction"
          />
          {status === CAMPAIGN_STATUS.WAITING && t('start')}
          {status === CAMPAIGN_STATUS.PAUSE && t('continue')}
        </MenuItem>
      )}
      {status === CAMPAIGN_STATUS.RUNNING && (
        <MenuItem
          className="dropdownItem"
          onClick={onChangeStatus(CAMPAIGN_STATUS.PAUSE)}
        >
          <PauseIcon
            color={status === CAMPAIGN_STATUS.RUNNING ? 'primary' : ''}
            className="iconAction"
          />
          {t('pause')}
        </MenuItem>
      )}
      {validEnd && (
        <MenuItem
          className="dropdownItem"
          onClick={onChangeStatus(CAMPAIGN_STATUS.END)}
        >
          <Icon color={validEnd ? 'primary' : ''} className="iconAction">
            stop_circle
          </Icon>
          {t('end')}
        </MenuItem>
      )}
      <MenuItem className="dropdownItem" onClick={handleCampaignResult}>
        <Icon color="primary" className="iconAction">
          analytics
        </Icon>
        {t('collectionResult')}
      </MenuItem>
      <MenuItem className="dropdownItem" onClick={onClickDelete}>
        <Icon aria-label="delete" color="error" className="iconAction">
          delete
        </Icon>
        {t('delete')}
      </MenuItem>
    </MenuActionStyled>
  );
}
