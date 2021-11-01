import React, { useState } from 'react';
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
  TableContainer,
  Paper,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../../apis';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { TableStyled } from './index.style';

const tableTitle = ['no', 'name', 'slotAmount', 'action'];

export default function IntentTable(props) {
  const {
    intentList,
    isLoading,
    setIsLoading,
    onHandleEdit,
    onHandleDelete,
    pagination,
  } = props;
  const [selectIntent, setSelectIntent] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickDelete = (intent) => {
    setIsDelete(true);
    setSelectIntent(intent);
  };

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setSelectIntent();
  };

  const handleDeleteIntent = async () => {
    setIsLoading(true);
    const selectIntentId = selectIntent && selectIntent.id;
    const { data } = await api.nluIntent.deleteIntent(selectIntentId);
    setIsLoading(false);
    if (data.status) {
      onHandleDelete(selectIntentId);
      enqueueSnackbar(t('deleteIntentSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteIntentError'), { variant: 'error' });
    }
    handleCloseConfirm();
  };

  return (
    <TableStyled>
      <TableContainer component={Paper}>
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
          {!isLoading && intentList && intentList.length <= 0 && (
            <Typography
              variant="body2"
              component="h2"
              className="emptyDataText"
            >
              {t('emptyData')}
            </Typography>
          )}
          <TableBody>
            {!isLoading &&
              intentList &&
              intentList.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    onClick={() => onHandleEdit(item.id)}
                    className="bodyRow"
                  >
                    <TableCell align="center" className="bodyCell">
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </TableCell>
                    <TableCell align="left" className="bodyCell nameBodyCell">
                      {item.name}
                    </TableCell>
                    <TableCell align="center" className="bodyCell time">
                      {item.slots.length}
                    </TableCell>
                    <TableCell align="center" className="bodyCell">
                      <Tooltip title={t('deleteIntent')}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickDelete(item);
                          }}
                          className="iconButton"
                        >
                          <DeleteIcon className="deleteIcon" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            {isLoading && <CircularProgress />}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={isDelete}
        title={t('confirm')}
        content={t('confirmDeleteIntent')}
        handleClose={handleCloseConfirm}
        handleConfirm={handleDeleteIntent}
      />
    </TableStyled>
  );
}
