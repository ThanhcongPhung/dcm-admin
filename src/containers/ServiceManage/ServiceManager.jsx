import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import debounce from 'lodash/debounce';
import {
  IconButton,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TextField,
  Avatar,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Delete } from '@material-ui/icons';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import NoData from '../../components/NoData';
import api from '../../apis';
import { MAX_ITEMS_SMALL, SYSTEM_ROLE } from '../../constants';
import { ServiceManagerStyled } from './index.style';

const tableTitle = ['no', 'avatar', 'email', 'action'];

export default function ServiceManager({ open, handleClose, serviceId }) {
  const [page, setPage] = useState(0);
  const [deleteManagerId, setDeleteManagerId] = useState();
  const [managers, setManagers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const currentManagers = useRef(managers);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangePage = (value) => setPage(value);

  const fetchServiceManagers = async () => {
    const { data } = await api.service.getServiceManagers(serviceId);
    if (data.status) setManagers(data.result);
  };

  const handleAddManager = async () => {
    if (!selectedAccount) return;
    const { data } = await api.service.addServiceManager(
      serviceId,
      selectedAccount.id,
    );
    if (data.status) {
      const newManager = {
        managerId: selectedAccount.id,
        email: selectedAccount.email,
        avatar: selectedAccount.avatar,
      };
      setManagers([...managers, newManager]);
      enqueueSnackbar(t('addManagerSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('addManagerError'), { variant: 'error' });
    }
    setSelectedAccount(null);
  };

  const handleDeleteEmail = async () => {
    const { data } = await api.service.deleteServiceManager(
      serviceId,
      deleteManagerId,
    );
    if (data.status) {
      const currManagers = managers.filter(
        (item) => item.managerId !== deleteManagerId,
      );
      setManagers(currManagers);
      if (!currManagers.slice(page * MAX_ITEMS_SMALL).length && page > 0)
        setPage(page - 1);
      enqueueSnackbar(t('deleteManagerSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteManageError'), { variant: 'error' });
    }
    setDeleteManagerId();
  };

  const delaySearch = useRef(
    debounce(async (searchValue) => {
      if (searchValue.trim() !== '') {
        const { data } = await api.user.getUsers({
          search: searchValue,
          roleName: `${SYSTEM_ROLE.USER},${SYSTEM_ROLE.SERVICE_MANAGER}`,
        });
        if (data.status) {
          const userList = (data.result && data.result.users) || [];
          const isValidManager = (userId) =>
            currentManagers.current.every((item) => item.managerId !== userId);
          const chooseManagers = userList.filter((userItem) =>
            isValidManager(userItem.id),
          );
          setAccounts(chooseManagers);
        }
      } else {
        setAccounts([]);
      }
    }, 800),
  ).current;

  useEffect(() => {
    if (inputValue === '')
      setAccounts(selectedAccount ? [selectedAccount] : []);
    delaySearch(inputValue);
  }, [selectedAccount, inputValue]);

  useEffect(() => {
    currentManagers.current = managers;
  }, [managers]);

  useEffect(() => {
    if (serviceId) fetchServiceManagers();
  }, [serviceId]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title">{t('serviceManager')}</DialogTitle>
      <DialogContent>
        <ServiceManagerStyled>
          <Grid container spacing={2} className="addManager">
            <Grid item sx={10} sm={10}>
              <Autocomplete
                getOptionLabel={(option) => option.email}
                options={accounts}
                autoComplete
                autoHighlight
                includeInputInList
                filterSelectedOptions
                noOptionsText={t('noOptions')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('enterEmail')}
                    variant="outlined"
                  />
                )}
                renderOption={(option) => (
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item>
                      <Avatar src={option.avatar} />
                    </Grid>
                    <Grid item xs>
                      <Typography>{option.name}</Typography>
                      <Typography variant="body2">{option.email}</Typography>
                    </Grid>
                  </Grid>
                )}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                value={selectedAccount}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setAccounts([newValue, ...accounts]);
                    setSelectedAccount(newValue);
                  }
                }}
              />
            </Grid>
            <Grid item sx={2} sm={2} className="addButton">
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleAddManager}
                disabled={!selectedAccount}
              >
                {t('add')}
              </Button>
            </Grid>
          </Grid>
          <Table className="tableManager">
            <TableHead>
              <TableRow>
                {tableTitle.map((title) => (
                  <TableCell align="center" key={title} className="headerCell">
                    {t(title)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {managers
                .slice(
                  page * MAX_ITEMS_SMALL,
                  page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
                )
                .map((manager, index) => (
                  <TableRow key={manager.email}>
                    <TableCell align="center" className="bodyCell">
                      {page * MAX_ITEMS_SMALL + index + 1}
                    </TableCell>
                    <TableCell align="center" className="bodyCell">
                      <Avatar
                        classes={{ root: 'avatar' }}
                        src={manager.avatar}
                      />
                    </TableCell>
                    <TableCell align="left" className="bodyCell">
                      {manager.email}
                    </TableCell>
                    <TableCell align="center" className="bodyCell">
                      <Tooltip title={t('delete')}>
                        <IconButton
                          onClick={() => setDeleteManagerId(manager.managerId)}
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              {(!managers || !managers.length) && (
                <TableRow>
                  <TableCell className="bodyCell" colSpan={4}>
                    <NoData text={t('noData')} />
                  </TableCell>
                </TableRow>
              )}
              {managers.length > MAX_ITEMS_SMALL && (
                <TablePagination
                  rowsPerPageOptions={[]}
                  count={managers.length}
                  rowsPerPage={MAX_ITEMS_SMALL}
                  page={page}
                  onChangePage={(event, newPage) => handleChangePage(newPage)}
                />
              )}
            </TableBody>
          </Table>
        </ServiceManagerStyled>
        <ConfirmDialog
          open={!!deleteManagerId}
          title={t('confirm')}
          content={t('confirmDeleteManager')}
          handleClose={() => setDeleteManagerId()}
          handleConfirm={handleDeleteEmail}
        />
      </DialogContent>
    </Dialog>
  );
}
