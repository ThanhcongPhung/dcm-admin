import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { PopupFormStyle } from './index.style';

export default function PopupForm({ title, children, openPopup, handleClose }) {
  return (
    <PopupFormStyle>
      <Dialog
        open={openPopup}
        maxWidth="md"
        fullWidth
        classes={{ paper: 'dialog-wrapper' }}
        onClose={handleClose}
      >
        <DialogTitle className="dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </PopupFormStyle>
  );
}
