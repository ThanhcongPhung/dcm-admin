import React, { useState } from 'react';
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
  Chip,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../apis';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import { TableStyled } from './index.style';

const tableTitle = [
  'STT',
  'name',
  'serviceInputs',
  'serviceActions',
  'campaignType',
  'url',
  'serviceManager',
  'action',
];

function ServerTable({
  serviceList,
  isLoading,
  setIsLoading,
  handleClickServiceEdit,
  pagination,
  onHandleDelete,
  handleShowManager,
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [selectService, setSelectService] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const [anchorEl, setAnchorEl] = useState();

  const handleOpenMenu = (service) => (e) => {
    setAnchorEl(e.currentTarget);
    setSelectService(service);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectService();
  };

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setSelectService();
  };

  const handleEditService = () => {
    handleClickServiceEdit(selectService);
    setSelectService();
  };

  const handleDeleteService = async () => {
    setIsLoading(true);
    setIsDelete(false);
    const { data } = await api.service.deleteService(selectService.id);
    setIsLoading(false);
    if (data.status) {
      onHandleDelete(selectService.id);
      enqueueSnackbar(t('deleteServiceSuccess'), { variant: 'success' });
    } else if (data.code === 600) {
      enqueueSnackbar(`${t('error')}: ${t('serviceIsUsedInCampaign')}`, {
        variant: 'error',
      });
    } else {
      enqueueSnackbar(t('deleteServiceError'), { variant: 'error' });
    }
    setSelectService();
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
          {serviceList &&
            serviceList.map((serviceItem, index) => (
              <React.Fragment key={serviceItem.name}>
                <TableRow className="bodyRow">
                  <TableCell align="center" className="bodyCell">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </TableCell>
                  <TableCell align="left" className="bodyCell">
                    {serviceItem.name}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {serviceItem.inputs.toString().split(',').join(', ')}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {serviceItem.actions.toString().split(',').join(', ')}
                  </TableCell>
                  <TableCell align="center" className="bodyCell campaignType">
                    {serviceItem.campaignTypes &&
                      serviceItem.campaignTypes.map((value) => (
                        <Chip key={value} label={value} className="chipInput" />
                      ))}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {serviceItem.url}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    <Typography
                      className="viewManager"
                      onClick={() => handleShowManager(serviceItem.id)}
                    >
                      {t('view')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleOpenMenu(serviceItem)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={!!selectService}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    className="dropdownItem"
                    onClick={handleEditService}
                  >
                    <Icon aria-label="edit">edit</Icon>
                    {t('edit')}
                  </MenuItem>
                  <MenuItem
                    className="dropdownItem"
                    onClick={() => setIsDelete(true)}
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
        open={isDelete}
        title={t('confirm')}
        content={t('confirmDeleteService')}
        handleClose={handleCloseConfirm}
        handleConfirm={handleDeleteService}
      />
    </TableStyled>
  );
}

export default ServerTable;
