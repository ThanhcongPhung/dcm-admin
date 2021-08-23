import React, { useState } from 'react';
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
  Menu,
  MenuItem,
  Icon,
  Tooltip,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import api from '../../apis';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
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
  } = props;
  const [selectCampaignId, setSelectCampaignId] = useState('');
  const [anchorEl, setAnchorEl] = useState();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCampaign = async () => {
    setIsLoading(true);
    setAnchorEl(null);
    const { data } = await api.campaign.deleteCampaign(selectCampaignId);
    setIsLoading(false);
    if (data.status) {
      onHandleDelete(selectCampaignId);
      enqueueSnackbar(t('deleteCampaignSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteCampaignError'), { variant: 'error' });
    }
    setSelectCampaignId();
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
                <TableRow className="bodyRow">
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
                  <TableCell align="center" className="bodyCell">
                    {t(item.status)}
                  </TableCell>

                  <TableCell align="center" className="bodyCell">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    className="dropdownItem"
                    onClick={() => onHandleEdit(item.id)}
                  >
                    <Icon aria-label="edit">edit</Icon>
                    {t('edit')}
                  </MenuItem>
                  <MenuItem
                    className="dropdownItem"
                    onClick={() => setSelectCampaignId(item.id)}
                  >
                    <Icon aria-label="delete" color="error">
                      delete
                    </Icon>
                    {t('delete')}
                  </MenuItem>
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
        open={!!selectCampaignId}
        title={t('confirm')}
        content={t('confirmDeleteService')}
        handleClose={() => {
          setSelectCampaignId('');
          setAnchorEl(null);
        }}
        handleConfirm={handleDeleteCampaign}
      />
    </TableStyled>
  );
}
