import React, { useEffect, useState } from 'react';
import {
  Modal,
  Paper,
  Backdrop,
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { CreateIntentModalStyled } from './index.style';
import api from '../../../apis';

const EditSlot = ({ isAdd, slot, slots, handleCancel, handleSave }) => {
  const { t } = useTranslation();
  const [slotData, setSlotData] = useState({});
  const [slotDataError, setSlotDataError] = useState();

  const validateSlotData = () => {
    const { name, tag } = slotData;
    const error = {};
    if (!name || !name.trim()) error.name = 'requiredField';
    if (!tag || !tag.trim()) error.tag = 'requiredField';
    else {
      const slotExist = slots.find(
        (el) =>
          ((slot && el.tag !== slot.tag) || !slot) && el.tag === slotData.tag,
      );
      if (slotExist) error.tag = 'tagExistError';
    }
    if (error && Object.keys(error).length) {
      setSlotDataError({ ...error });
      return false;
    }
    return true;
  };

  const handleBeforeSave = () => {
    if (!validateSlotData()) return;
    setSlotData({});
    handleSave(slotData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlotData({ ...slotData, [name]: value });
  };

  useEffect(() => {
    if (slot) setSlotData({ ...slot });
  }, [slot]);

  return (
    <React.Fragment key={slot && slot.tag}>
      <TableRow className="bodyRow">
        <TableCell align="center" className="bodyCell" size="small">
          <TextField
            value={slotData && slotData.name}
            name="name"
            variant="outlined"
            size="small"
            onChange={handleChange}
            error={slotDataError && slotDataError.name}
            helperText={slotDataError && t(slotDataError.name)}
          />
        </TableCell>
        <TableCell align="center" className="bodyCell" size="small">
          <TextField
            value={slotData && slotData.tag}
            name="tag"
            variant="outlined"
            size="small"
            onChange={handleChange}
            error={slotDataError && slotDataError.tag}
            helperText={slotDataError && t(slotDataError.tag)}
          />
        </TableCell>
        <TableCell align="center" className="bodyCell" size="small">
          <Box display="flex" justifyContent="flex-end" alignItems="center" ggr>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBeforeSave}
              className="mr2"
            >
              {isAdd ? t('create') : t('save')}
            </Button>
            <Button variant="outlined" color="primary" onClick={handleCancel}>
              {t('cancel')}
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const SlotItem = ({ slot, key, handleEdit, handleDelete }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment key={key}>
      <TableRow className="bodyRow" onClick={() => handleEdit(slot)}>
        <TableCell align="center" className="bodyCell" size="small">
          {slot.name}
        </TableCell>
        <TableCell align="center" className="bodyCell" size="small">
          {slot.tag}
        </TableCell>
        <TableCell align="center" className="bodyCell" size="small">
          <Tooltip title={t('deleteIntent')}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(slot);
              }}
              className="iconButton"
            >
              <DeleteIcon className="deleteIcon" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
const tableTitle = ['name', 'tag', 'action'];
export default function CreateIntentModal({
  open,
  handleClose,
  intent,
  handleCreate,
  handleUpdate,
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [intentData, setIntentData] = useState({});
  const [intentDataError, setIntentDataError] = useState();
  const [slotEdit, setSlotEdit] = useState();
  const [isAdd, setIsAdd] = useState(false);

  const handleChangeIntentName = (e) => {
    setIntentData({
      ...intentData,
      name: e.target.value,
    });
  };

  const handleOpenAddSlot = () => {
    setIsAdd(true);
    setSlotEdit();
  };

  const handleOpenEditSlot = (slot) => {
    setIsAdd(false);
    setSlotEdit({ ...slot });
  };

  const handleDeleteSlot = (slotDelete) => {
    const newSlots = intentData.slots.filter(
      (slot) => slot.tag !== slotDelete.tag,
    );
    setIntentData({ ...intentData, slots: [...newSlots] });
  };

  const handleAddSlot = (slotAdd) => {
    const tempSlots = (intentData && intentData.slots) || [];
    setIntentData({
      ...intentData,
      slots: [...tempSlots, { ...slotAdd, type: 'TEXT' }],
    });
  };

  const handleEditSlot = (newSlotEdit) => {
    const newSlots = [...intentData.slots];
    const slotEditIndex = newSlots.findIndex(
      (slot) => slot.tag === slotEdit.tag,
    );
    newSlots[slotEditIndex] = { ...newSlotEdit };
    setIntentData({ ...intentData, slots: [...newSlots] });
    setSlotEdit();
  };

  const handleCancelEdit = () => {
    setSlotEdit();
    setIsAdd(false);
  };

  const handleSaveSlot = (newSlot) => {
    if (isAdd) {
      handleAddSlot(newSlot);
      handleCancelEdit();
      return;
    }
    handleEditSlot(newSlot);
    handleCancelEdit();
  };

  const handleRemoveAll = () => {
    setIntentData({});
    setIntentDataError();
    setSlotEdit();
    setIsAdd(false);
    handleClose();
  };

  const handleUpdateIntent = async () => {
    setIsLoading(true);
    const { name, slots } = intentData;
    const newSlots = slots.map((el) => ({
      name: el.name,
      tag: el.tag,
      type: el.type,
    }));
    const { data } = await api.nluIntent.updateIntent(intent.id, {
      name,
      slots: [...newSlots],
    });
    setIsLoading(false);
    handleRemoveAll();
    if (data && data.status) {
      handleUpdate();
      enqueueSnackbar(t('updateIntentSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('updateIntentError'), { variant: 'error' });
    }
  };

  const handleCreateIntent = async () => {
    setIsLoading(true);
    const { name, slots } = intentData;
    const { data } = await api.nluIntent.createIntent({
      name,
      slots,
    });
    setIsLoading(false);
    handleRemoveAll();
    if (data && data.status) {
      handleCreate();
      enqueueSnackbar(t('createIntentSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('createIntentError'), { variant: 'error' });
    }
  };

  const validateIntentData = () => {
    const { name, slots } = intentData;
    const error = {};
    if (!name || !name.trim()) error.name = 'requiredField';
    if (!slots || !slots.length) error.slots = 'requiredField';
    if (error && Object.keys(error).length > 0) {
      setIntentDataError({ ...error });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateIntentData()) return;
    if (intent) {
      handleUpdateIntent();
      return;
    }
    handleCreateIntent();
  };

  useEffect(() => {
    if (intent && open) setIntentData({ ...intent });
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
      <CreateIntentModalStyled>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Paper elevation={3} className="contentModal">
            <div className="header">
              <Typography variant="h5" className="headTitle">
                {t('addIntent')}
              </Typography>
              <IconButton aria-label="close" onClick={handleRemoveAll}>
                <CloseIcon size="small" />
              </IconButton>
            </div>
            <div className="form">
              <div className="nameItem">
                <Typography variant="body1" className="label">
                  {t('name')}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={intentData && intentData.name}
                  onChange={handleChangeIntentName}
                  error={intentDataError && intentDataError.name}
                  helperText={intentDataError && t(intentDataError.name)}
                />
              </div>
              <div className="slotItem">
                <Typography variant="body1" className="label">
                  {t('slots')}
                </Typography>
                <TableContainer component={Paper} className="tableContainer">
                  <Table className="table">
                    <TableHead>
                      <TableRow>
                        {tableTitle.map((item) => (
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
                      {intentData &&
                        intentData.slots &&
                        intentData.slots.map((slot) =>
                          slotEdit && slotEdit.tag === slot.tag ? (
                            <EditSlot
                              slot={slotEdit}
                              handleCancel={handleCancelEdit}
                              handleSave={handleSaveSlot}
                              slots={intentData.slots}
                            />
                          ) : (
                            <SlotItem
                              slot={slot}
                              key={slot.tag}
                              handleEdit={handleOpenEditSlot}
                              handleDelete={handleDeleteSlot}
                            />
                          ),
                        )}
                      {isAdd && (
                        <EditSlot
                          isAdd
                          handleCancel={handleCancelEdit}
                          handleSave={handleSaveSlot}
                          slots={(intentData && intentData.slots) || []}
                        />
                      )}
                    </TableBody>
                  </Table>
                  {!isAdd && (
                    <div className="addItem">
                      <Button
                        fullWidth
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddSlot}
                      >
                        {t('add')}
                      </Button>
                    </div>
                  )}
                </TableContainer>
              </div>
              <div className="errorText">
                {intentDataError && t(intentDataError.slots)}
              </div>
            </div>
            <div className="btnContainer">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleRemoveAll}
              >
                {t('cancel')}
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                {t('save')}
              </Button>
            </div>
          </Paper>
        )}
      </CreateIntentModalStyled>
    </Modal>
  );
}
