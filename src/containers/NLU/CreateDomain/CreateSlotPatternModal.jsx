import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Backdrop,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CreateSlotPatternModalStyled } from './index.style';

export default function CreateSlotPatternModal({
  open,
  handleClose,
  slots,
  slot,
  handleCreate,
  handleUpdate,
}) {
  const { t } = useTranslation();
  const [slotData, setSlotData] = useState({});
  const [slotDataError, setSlotDataError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlotData({
      ...slotData,
      [name]: value,
    });
  };

  const handleRemoveAll = () => {
    setSlotData();
    setSlotDataError();
    handleClose();
  };

  const validateSlotData = () => {
    const error = {};
    slots.forEach(({ id: slotId }) => {
      if (!slotData[slotId] || !slotData[slotId].trim())
        error[slotId] = 'requiredField';
    });
    if (Object.keys(error).length) {
      setSlotDataError({ ...error });
      return false;
    }
    return true;
  };

  const handleBeforeSave = () => {
    if (!validateSlotData()) return;
    handleRemoveAll();
    if (slot) {
      handleUpdate(slotData);
      return;
    }
    handleCreate(slotData);
  };

  useEffect(() => {
    if (slot && open) setSlotData({ ...slot });
  }, [open]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <CreateSlotPatternModalStyled>
        <Paper elevation={3} className="contentModal">
          <div className="header">
            <Typography variant="h5" className="headTitle">
              {t(!slot ? 'addSlotPattern' : 'updateSlotPattern')}
            </Typography>
            <IconButton aria-label="close" onClick={handleRemoveAll}>
              <CloseIcon size="small" />
            </IconButton>
          </div>
          <div className="form">
            {slots.map((item) => (
              <div className="nameItem">
                <Typography variant="body1" className="label">
                  {t(item.name)}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name={item.id}
                  value={slotData && slotData[item.id]}
                  onChange={handleChange}
                  error={slotDataError && slotDataError[item.id]}
                  helperText={slotDataError && t(slotDataError[item.id])}
                />
              </div>
            ))}
          </div>
          <div className="btnContainer">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleRemoveAll}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBeforeSave}
            >
              {t('save')}
            </Button>
          </div>
        </Paper>
      </CreateSlotPatternModalStyled>
    </Modal>
  );
}
