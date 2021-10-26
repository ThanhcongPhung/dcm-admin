import React, { useEffect, useState } from 'react';
import {
  Modal,
  Paper,
  Backdrop,
  Typography,
  TextField,
  List,
  ListItem,
  Grid,
  Box,
  Button,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';
import { CreateIntentModalStyled } from './index.style';

const actionMenus = ['edit', 'delete'];

const MenuAction = ({ menus, anchorEl, handleClose, onClick }) => {
  const { t } = useTranslation();

  const handleClickItem = (action) => {
    handleClose();
    onClick(action);
  };

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {menus.map((action) => (
        <MenuItem key={action} onClick={() => handleClickItem(action)}>
          {t(action)}
        </MenuItem>
      ))}
    </Menu>
  );
};

const EditSlot = ({ isAdd, slot, slots, handleCancel, handleSave }) => {
  const { t } = useTranslation();
  const [slotData, setSlotData] = useState();
  const [slotDataError, setSlotDataError] = useState();

  const validateSlotData = () => {
    const { name, tag } = slotData;
    const error = {};
    if (!name || !name.trim()) error.name = 'Name cannot be blank';
    if (!tag || !tag.trim()) error.tag = 'Tag cannot be blank';
    else {
      const slotExist = slots.find(
        (el) =>
          ((slot && el.tag !== slot.tag) || !slot) && el.tag === slotData.tag,
      );
      if (slotExist) error.tag = 'Tag already exists';
    }
    if (error && Object.keys(error).length) {
      setSlotDataError({ ...error });
      return false;
    }
    return true;
  };

  const handleBeforeSave = () => {
    if (!validateSlotData()) return;
    setSlotData();
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
    <ListItem key={slot && slot.tag}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            value={slotData && slotData.name}
            name="name"
            onChange={handleChange}
            error={slotDataError && slotDataError.name}
            helperText={slotDataError && slotDataError.name}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={slotData && slotData.tag}
            name="tag"
            onChange={handleChange}
            error={slotDataError && slotDataError.tag}
            helperText={slotDataError && slotDataError.tag}
          />
        </Grid>
        <Grid item xs={6}>
          <Box display="flex">
            <Box m={0.5}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleBeforeSave}
              >
                {isAdd ? t('create') : t('save')}
              </Button>
            </Box>
            <Box m={0.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                {t('cancel')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
};

const SlotItem = ({ slot, key, handleClickMenu }) => {
  return (
    <ListItem key={key}>
      <ListItemText>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {slot.name}
          </Grid>
          <Grid item xs={3}>
            {slot.tag}
          </Grid>
          <Grid item xs={6} />
        </Grid>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e) => handleClickMenu(e, slot)}
        >
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default function CreateIntentModal({ open, handleClose, intent }) {
  const { t } = useTranslation();
  const [intentData, setIntentData] = useState();
  const [slotSelect, setSlotSelect] = useState();
  const [slotEdit, setSlotEdit] = useState();
  const [isAdd, setIsAdd] = useState(false);
  const [anchorMenuEl, setAnchorMenuEl] = useState(null);

  const handleOpenMenu = (e, slot) => {
    setSlotSelect({ ...slot });
    setAnchorMenuEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenuEl(null);
  };

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

  const handleOpenEditSlot = () => {
    setSlotEdit({ ...slotSelect });
  };

  const handleDeleteSlot = () => {
    const newSlots = intentData.slots.filter(
      (slot) => slot.tag !== slotSelect.tag,
    );
    setIntentData({ ...intentData, slots: [...newSlots] });
    setSlotSelect();
  };

  const handleAddSlot = (slotAdd) => {
    const tempSlots = (intentData && intentData.slots) || [];
    setIntentData({
      ...intentData,
      slots: [...tempSlots, { ...slotAdd }],
    });
  };

  const handleEditSlot = (newSlotEdit) => {
    const newSlots = [...intentData.slots];
    const slotEditIndex = newSlots.findIndex(
      (slot) => slot.tag === slotSelect.tag,
    );
    newSlots[slotEditIndex] = { ...newSlotEdit };
    setIntentData({ ...intentData, slots: [...newSlots] });
    setSlotEdit();
  };

  const handleCancelEdit = () => {
    setSlotEdit();
    setIsAdd(false);
    setSlotSelect();
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

  const handleClickMenuItem = (action) => {
    switch (action) {
      case 'edit':
        handleOpenEditSlot();
        break;
      case 'delete':
        handleDeleteSlot();
        break;
      default:
    }
  };

  useEffect(() => {
    if (intent) {
      setIntentData({ ...intent });
    }
  }, [intent]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <CreateIntentModalStyled>
        <Paper elevation={3} className="contentModal">
          <div className="header">
            <Typography variant="h5" className="headTitle">
              {t('addIntent')}
            </Typography>
          </div>
          <div className="form">
            <div className="item">
              <TextField
                fullWidth
                size="small"
                label={t('name')}
                variant="outlined"
                value={intentData && intentData.name}
                onChange={handleChangeIntentName}
              />
            </div>
            <div className="item">
              <Typography variant="body2">{t('slots')}</Typography>
              <List dense>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body2" className="slotHeaderText">
                        {t('name')}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2" className="slotHeaderText">
                        {' '}
                        {t('tag')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} />
                  </Grid>
                </ListItem>
              </List>
              <List dense>
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
                        handleClickMenu={handleOpenMenu}
                      />
                    ),
                  )}
              </List>

              {isAdd ? (
                <EditSlot
                  isAdd
                  handleCancel={handleCancelEdit}
                  handleSave={handleSaveSlot}
                  slots={(intentData && intentData.slots) || []}
                />
              ) : (
                <div className="addItem">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddSlot}
                  >
                    {t('add')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Paper>
        <MenuAction
          menus={actionMenus}
          anchorEl={anchorMenuEl}
          onClick={handleClickMenuItem}
          handleClose={handleCloseMenu}
        />
      </CreateIntentModalStyled>
    </Modal>
  );
}
