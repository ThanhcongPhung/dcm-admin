import React, { useState } from 'react';
import clsx from 'clsx';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Icon,
  Tooltip,
  Typography,
} from '@material-ui/core';
import api from '../../apis';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import ShowStatus from './ShowStatus';
import { CAMPAIGN_STATUS } from '../../constants';
import { TableStyled } from './index.style';

const tableTitle = [
  'no',
  'name',
  'time',
  'collectDataService',
  'campaignAction',
  'campaignVisibility',
  'amountParticipant',
  'status',
  'action',
];

export default function CampaignTable(props) {
  const {
    campaignList,
    services,
    isLoading,
    setIsLoading,
    onHandleEdit,
    pagination,
    onHandleDelete,
    onHandleChangeStatus,
  } = props;
  const [selectCampaignId, setSelectCampaignId] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [incomingStatus, setIncomingStatus] = useState();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setIncomingStatus();
    setSelectCampaignId();
  };

  const handleClickStatus = (campaignId, status) => (e) => {
    e.stopPropagation();
    setIncomingStatus(status);
    setSelectCampaignId(campaignId);
  };

  const handleClickDelete = (campaignId) => (e) => {
    e.stopPropagation();
    setIsDelete(true);
    setSelectCampaignId(campaignId);
  };

  const handleDeleteCampaign = async () => {
    setIsLoading(true);
    const { data } = await api.campaign.deleteCampaign(selectCampaignId);
    setIsLoading(false);
    if (data.status) {
      onHandleDelete(selectCampaignId);
      enqueueSnackbar(t('deleteCampaignSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteCampaignError'), { variant: 'error' });
    }
    handleCloseConfirm();
  };

  const handleChangeStatus = async () => {
    setIsLoading(true);
    const { data } = await api.campaign.updateStatusCampaign(
      selectCampaignId,
      incomingStatus,
    );
    setIsLoading(false);
    if (data.status) {
      onHandleChangeStatus();
      enqueueSnackbar(t('changeStatusSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('changeStatusError'), { variant: 'error' });
    }
    handleCloseConfirm();
  };

  const getServiceName = (id) => {
    const element = services.find((item) => item.id === id);
    if (element) return t(element.name);
    return null;
  };

  return (
    <TableStyled>
      <Table className="table">
        <TableHead>
          <TableRow>
            {tableTitle &&
              tableTitle.map((item) => (
                <TableCell
                  key={item}
                  align="left"
                  variant="head"
                  className="headerCell"
                >
                  <div className="cellContent">{t(item)}</div>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {campaignList &&
            campaignList.map((item, index) => (
              <React.Fragment key={item.name}>
                <TableRow
                  className="bodyRow"
                  onClick={() => onHandleEdit(item.id)}
                >
                  <TableCell align="center" className="bodyCell">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </TableCell>
                  <TableCell align="left" className="bodyCell">
                    {item.name}
                  </TableCell>
                  <TableCell align="left" className="bodyCell">
                    <Tooltip
                      title={`${Moment(item.startTime).format(
                        'HH:mm DD/MM/YYYY',
                      )} - ${Moment(item.endTime).format('HH:mm DD/MM/YYYY')}`}
                    >
                      <Typography>
                        {Moment(item.startTime).format('DD/MM')} -{' '}
                        {Moment(item.startTime).format('DD/MM')}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {getServiceName(item.service)}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {t(item.action)}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {t(item.campaignVisibility)}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {(item.participant && item.participant.length) || 0}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clsx('bodyCell status', {
                      end: item.status === CAMPAIGN_STATUS.END,
                    })}
                  >
                    {t(item.status)}
                  </TableCell>
                  <TableCell align="center" className="bodyCell action">
                    <ShowStatus
                      status={item.status}
                      campaignId={item.id}
                      onChangeStatus={handleClickStatus}
                    />
                    <Tooltip title={t('clickToPause')}>
                      <IconButton
                        onClick={handleClickDelete(item.id)}
                        className="iconButton"
                      >
                        <Icon aria-label="delete" color="error">
                          delete
                        </Icon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          {isLoading && (
            <TableRow>
              <TableCell>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={!!incomingStatus || isDelete}
        title={t('confirm')}
        content={
          isDelete
            ? t('confirmDeleteService')
            : `${t('confirmChangeStatus')}: ${t(incomingStatus)}`
        }
        handleClose={handleCloseConfirm}
        handleConfirm={isDelete ? handleDeleteCampaign : handleChangeStatus}
      />
    </TableStyled>
  );
}
