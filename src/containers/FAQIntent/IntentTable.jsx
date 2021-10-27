import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Icon,
  Menu,
  MenuItem,
  Chip,
  CircularProgress,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import api from '../../apis';
import { TableStyled } from './index.style';

const tableTitle = [
  { title: 'STT', width: '5%' },
  { title: 'intent' },
  { title: 'category' },
  { title: 'intentTags' },
  { title: 'action', width: '10%' },
];

export default function IntentTable({
  listIntents,
  onHandleDelete,
  setIsLoading,
  isLoading,
  onHandleEdit,
  pagination,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [selectIntentId, setSelectIntentId] = useState();

  const handleOpenMenu = (intentId) => (e) => {
    setAnchorEl(e.currentTarget);
    setSelectIntentId(intentId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectIntentId();
  };

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setSelectIntentId();
  };

  const handleDeleteIntent = async () => {
    setIsLoading(true);
    setIsDelete(false);
    const { data } = await api.faqCategory.deleteCategory(selectIntentId);
    setIsLoading(false);
    if (data.status) {
      onHandleDelete(selectIntentId);
      enqueueSnackbar(t('deleteIntentSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteIntentError'), { variant: 'error' });
    }
    setSelectIntentId(null);
  };

  return (
    <TableStyled>
      <Table aria-label="customized table" className="table">
        <TableHead>
          <TableRow>
            {tableTitle &&
              tableTitle.map((item) => (
                <TableCell
                  key={item.title}
                  align="center"
                  variant="head"
                  className="headerCell"
                  style={{ width: item.width }}
                >
                  <div className="cellContent">{t(item.title)}</div>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listIntents &&
            listIntents.map((intent, index) => (
              <TableRow key={intent.id}>
                <TableCell className="bodyCell" align="center">
                  {(pagination.page - 1) * pagination.limit + index + 1}
                </TableCell>
                <TableCell component="th" scope="row" className="bodyCell">
                  {intent.intent}
                </TableCell>
                <TableCell className="bodyCell">
                  {intent.categoryId.title}
                </TableCell>
                <TableCell className="bodyCell">
                  {intent.tags &&
                    intent.tags.map((sub) => (
                      <Chip ey={sub} label={sub} className="customChip" />
                    ))}
                </TableCell>
                <TableCell className="bodyCell" align="center">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleOpenMenu(intent.id)}
                  >
                    <Icon> more_vert </Icon>
                  </IconButton>
                </TableCell>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={!!selectIntentId}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={() => onHandleEdit(selectIntentId)}>
                    <Icon aria-label="edit" className="iconAction">
                      edit
                    </Icon>
                    {t('edit')}
                  </MenuItem>
                  <MenuItem onClick={() => setIsDelete(true)}>
                    <Icon
                      aria-label="delete"
                      color="error"
                      className="iconAction"
                    >
                      delete
                    </Icon>
                    {t('delete')}
                  </MenuItem>
                </Menu>
              </TableRow>
            ))}
          {isLoading && (
            <TableRow>
              <TableCell>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {isDelete && (
          <ConfirmDialog
            open={isDelete}
            handleClose={handleCloseConfirm}
            title={t('titleConfirmDelete')}
            textButton={t('delete')}
            handleConfirm={handleDeleteIntent}
          />
        )}
      </Table>
    </TableStyled>
  );
}
