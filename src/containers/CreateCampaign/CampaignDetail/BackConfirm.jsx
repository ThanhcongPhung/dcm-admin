import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
} from '@material-ui/core';

export default function BackConfirm({
  open,
  handleClose,
  handlePrevStepAndSave,
  handlePrevStepAndNotSave,
}) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{t('prevStepConfirm')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('warningPrevStep')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button color="primary" onClick={handlePrevStepAndNotSave}>
          {t('backAndNotSave')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevStepAndSave}
        >
          {t('backAndSave')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
