import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
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
  Tooltip,
  Typography,
  Menu,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import api from '../../apis';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import { CAMPAIGN_STATUS } from '../../constants';
import MenuAction from './MenuAction';
import { TableStyled } from './index.style';

const tableTitle = [
  'no',
  'name',
  'time',
  'collectDataService',
  'amountParticipant',
  'status',
  'action',
];

export default function CampaignTable(props) {
  const history = useHistory();
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
  const [curStatus, setCurStatus] = useState();
  const [incomingStatus, setIncomingStatus] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const [isHover, setIsHover] = useState(true);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenMenu = (campaignId, status) => (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectCampaignId(campaignId);
    setCurStatus(status);
  };

  const handleCloseMenu = () => {
    setAnchorEl();
    setSelectCampaignId();
  };

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setIncomingStatus();
    setSelectCampaignId();
  };

  const handleClickStatus = (status) => (e) => {
    e.stopPropagation();
    setIncomingStatus(status);
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    setIsDelete(true);
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

  const handleParticipant = (campaignId) => (e) => {
    e.stopPropagation();
    history.push(`/campaigns/${campaignId}/participant`);
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
                  align="center"
                  variant="head"
                  className="headerCell"
                >
                  {t(item)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {campaignList &&
            campaignList.map((item, index) => (
              <React.Fragment key={item.id}>
                <TableRow
                  className={isHover ? 'bodyRow' : ''}
                  onClick={() => onHandleEdit(item.id)}
                >
                  <TableCell align="center" className="bodyCell">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </TableCell>
                  <TableCell align="left" className="bodyCell nameBodyCell">
                    {item.name}
                  </TableCell>
                  <TableCell align="center" className="bodyCell time">
                    <Tooltip
                      title={`${Moment(item.startTime).format(
                        'HH:mm DD/MM/YYYY',
                      )} - ${Moment(item.endTime).format('HH:mm DD/MM/YYYY')}`}
                    >
                      <Typography variant="body2">
                        {Moment(item.startTime).format('DD/MM')}-
                        {Moment(item.startTime).format('DD/MM')}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {getServiceName(item.serviceId)}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    <Typography
                      className="viewParticipant"
                      onClick={handleParticipant(item.id)}
                      onMouseEnter={() => setIsHover(false)}
                      onMouseLeave={() => setIsHover(true)}
                    >
                      {t('view')}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clsx('bodyCell status', {
                      end: item.status === CAMPAIGN_STATUS.END,
                    })}
                  >
                    {t(item.status)}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleOpenMenu(item.id, item.status)}
                      onMouseEnter={() => setIsHover(false)}
                      onMouseLeave={() => setIsHover(true)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={!!selectCampaignId}
                  onClose={handleCloseMenu}
                >
                  <MenuAction
                    status={curStatus}
                    onClickDelete={handleClickDelete}
                    onChangeStatus={handleClickStatus}
                  />
                </Menu>
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
