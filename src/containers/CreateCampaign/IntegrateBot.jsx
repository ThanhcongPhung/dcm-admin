import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Paper,
  TextField,
  CardHeader,
  CardContent,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BackspaceIcon from '@material-ui/icons/Backspace';
import EditIcon from '@material-ui/icons/Edit';
import api from '../../apis';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import DataInfo from '../../components/DataInfo';
import NoData from '../../components/NoData';
import { IntegrateBotStyled } from './index.style';

export default function IntegrateBot({ baseCampaign, setBaseCampaign }) {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [appId, setAppId] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateAppId = async () => {
    if (!appId)
      return enqueueSnackbar(t('integrateBotError'), { variant: 'error' });

    const { data } = await api.app.getApp(appId);
    if (data.status) {
      setBaseCampaign((prev) => ({
        ...prev,
        appId,
        botId: data.result.botId,
        apiKey: data.result.apiKey,
      }));
      setIsUpdate(false);
      return enqueueSnackbar(t('integrateBotSuccess'), { variant: 'success' });
    }
    return enqueueSnackbar(t('integrateBotError'), { variant: 'error' });
  };
  const handleCloseConfirmDialog = () => {
    setIsUpdate(false);
    setIsOpenConfirmDialog(false);
  };
  const handleOkConfirmDialog = () => {
    setIsOpenConfirmDialog(false);
    handleUpdateAppId();
  };

  const handleCancel = () => {
    setIsUpdate(false);
    if (baseCampaign.id && baseCampaign.appId) setAppId(baseCampaign.appId);
  };

  useEffect(() => {
    if (baseCampaign.id && baseCampaign.appId) setAppId(baseCampaign.appId);
  }, [baseCampaign.appId]);

  const ButtonAction = () =>
    isUpdate ? (
      <>
        <Tooltip title={t('cancel')}>
          <IconButton className="iconButton" onClick={handleCancel}>
            <BackspaceIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('save')}>
          <IconButton
            className="iconButton buttonSuccess"
            onClick={() => setIsOpenConfirmDialog(true)}
          >
            <CheckCircleIcon className="success" />
          </IconButton>
        </Tooltip>
      </>
    ) : (
      <Tooltip title={t('update')}>
        <IconButton className="iconButton" onClick={() => setIsUpdate(true)}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
    );

  return (
    <IntegrateBotStyled>
      <Paper variant="outlined" className="paper">
        <CardHeader
          avatar={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Avatar
              className="avatar"
              variant="rounded"
              src={`${process.env.PUBLIC_URL}/images/chatbot-icon.svg`}
            />
          }
          title={t('appId')}
          action={<ButtonAction />}
        />
        <CardContent className="content">
          {isUpdate && (
            <TextField
              type="text"
              variant="outlined"
              placeholder={t('enterAppId')}
              fullWidth
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
            />
          )}
          {!isUpdate && baseCampaign.appId && (
            <DataInfo text={baseCampaign.appId} isPassword />
          )}
          {!isUpdate && !baseCampaign.appId && (
            <NoData text={t('noDataAppID')} />
          )}
        </CardContent>

        <ConfirmDialog
          open={isOpenConfirmDialog}
          textButton={t('confirm')}
          title={t('confirm')}
          content={t('confirmContent')}
          handleClose={handleCloseConfirmDialog}
          handleConfirm={handleOkConfirmDialog}
        />
      </Paper>
    </IntegrateBotStyled>
  );
}
