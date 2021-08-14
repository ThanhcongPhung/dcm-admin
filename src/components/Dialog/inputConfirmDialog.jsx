import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function InputConfirmDialog(props) {
  const {
    open,
    handleClose,
    title,
    text,
    placeholder,
    buttonText,
    onClick,
    loading,
    validInput,
  } = props;
  const { t } = useTranslation('setting');
  const [confirm, setConfirm] = useState(false);

  const handleConfirmInput = (e) => {
    if (e.target.value === validInput) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && confirm) {
      onClick();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <TextField
          fullWidth
          placeholder={placeholder}
          margin="normal"
          variant="outlined"
          onChange={handleConfirmInput}
          onKeyPress={onKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('cancel')}
        </Button>
        <Button onClick={onClick} color="primary" disabled={!confirm}>
          {loading ? (
            <CircularProgress size={22} color="secondary" />
          ) : (
            buttonText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
