import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../apis';
import ConfirmDialog from '../../components/Dialog/confirmDialog';
import { TableStyled } from './index.style';

const tableTitle = [
  'STT',
  'name',
  'description',
  'serviceInputs',
  'serviceActions',
  'url',
  'action',
];

function ServerTable({
  serviceList,
  isLoading,
  setIsLoading,
  fetchGetServices,
  handleClickServiceEdit,
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [serviceDelete, setServiceDelete] = useState('');

  const [anchorEl, setAnchorEl] = useState();
  const [menuState, setMenuState] = useState([]);
  const handleRequestCloseMenu = (index) => () => {
    const newArr = [...menuState];
    newArr[index] = false;
    setMenuState(newArr);
  };
  const onContactOptionSelect = (index) => (e) => {
    const newArr = [...menuState];
    newArr[index] = true;
    setMenuState(newArr);
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    if (serviceList) {
      const newArr = [];
      for (let i = 0; i < serviceList.length; i += 1) {
        newArr.push(false);
      }
      setMenuState(newArr);
    }
  }, [serviceList]);

  const handleDeleteService = async () => {
    setIsLoading(false);
    const { data } = await api.service.deleteService(serviceDelete);
    setIsLoading(true);
    setServiceDelete('');
    fetchGetServices({ offset: 0 });
    if (data.status) {
      enqueueSnackbar(t('deleteServiceSuccess'), {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(t('deleteServiceError'), {
        variant: 'error',
      });
    }
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
          {serviceList &&
            serviceList.map((serviceItem, index) => (
              <React.Fragment key={serviceItem.name}>
                <TableRow className="bodyRow">
                  <TableCell align="center" className="bodyCell">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" className="bodyCell">
                    {serviceItem.name}
                  </TableCell>
                  <TableCell align="left" className="bodyCell">
                    {serviceItem.description}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {serviceItem.inputs.toString().split(',').join(', ')}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {serviceItem.actions.toString().split(',').join(', ')}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {serviceItem.url}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={onContactOptionSelect(index)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={menuState[index] || false}
                  onClose={handleRequestCloseMenu(index)}
                  onClick={handleRequestCloseMenu(index)}
                >
                  <MenuItem
                    className="dropdownItem"
                    onClick={() => handleClickServiceEdit(serviceItem)}
                  >
                    <Icon aria-label="edit">edit</Icon>
                    {t('edit')}
                  </MenuItem>
                  <MenuItem
                    className="dropdownItem"
                    onClick={() => setServiceDelete(serviceItem.id)}
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
        open={!!serviceDelete}
        title={t('confirm')}
        content={t('confirmDeleteService')}
        handleClose={() => setServiceDelete('')}
        handleConfirm={handleDeleteService}
      />
    </TableStyled>
  );
}

export default ServerTable;
