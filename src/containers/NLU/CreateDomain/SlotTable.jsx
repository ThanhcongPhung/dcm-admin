import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  TableContainer,
  Paper,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { TableStyled } from './index.style';

export default function SlotTable({
  slots,
  patternSlots,
  handleEdit,
  handleDelete,
}) {
  const [selectSlot, setSelectSlot] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const { t } = useTranslation();

  const handleClickDelete = (slot) => {
    setIsDelete(true);
    setSelectSlot(slot);
  };

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setSelectSlot();
  };

  const handleDeleteSlot = () => {
    handleDelete(selectSlot);
    handleCloseConfirm();
  };

  const getSlotValue = (slotId, tempPatternSlots) => {
    const slotFind = tempPatternSlots.find((el) => el.slot === slotId);
    if (slotFind) return slotFind.value;
    return '';
  };

  return (
    <TableStyled>
      <TableContainer component={Paper}>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell align="center" variant="head" className="headerCell">
                {t('no')}
              </TableCell>
              {slots.map((item) => (
                <TableCell
                  key={item}
                  align="center"
                  variant="head"
                  className="headerCell"
                >
                  {t(item.name)}
                </TableCell>
              ))}
              <TableCell align="center" variant="head" className="headerCell">
                {t('action')}
              </TableCell>
            </TableRow>
          </TableHead>
          {!patternSlots.length && (
            <Typography
              variant="body2"
              component="h2"
              className="emptyDataText"
            >
              {t('emptyData')}
            </Typography>
          )}
          <TableBody>
            {patternSlots.map((item, index) => (
              <React.Fragment key={item}>
                <TableRow className="bodyRow" onClick={() => handleEdit(index)}>
                  <TableCell align="center" className="bodyCell">
                    {index + 1}
                  </TableCell>
                  {slots.map((slot) => (
                    <TableCell align="center" className="bodyCell">
                      {getSlotValue(slot.id, patternSlots[index])}
                    </TableCell>
                  ))}
                  <TableCell align="center" className="bodyCell">
                    <Tooltip title={t('deleteSlot')}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickDelete(index);
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
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={isDelete}
        title={t('confirm')}
        content={t('confirmDeleteSlot')}
        handleClose={handleCloseConfirm}
        handleConfirm={handleDeleteSlot}
      />
    </TableStyled>
  );
}
