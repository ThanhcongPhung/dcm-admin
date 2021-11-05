import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import api from '../../apis';
import { ScenarioFormStyled } from './index.style';

export default function ScenarioForm({ open, handleClose }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [scenario, setScenario] = useState({
    domain: '',
    name: '',
    roleUser1: { name: '', description: '' },
    roleUser2: { name: '', description: '' },
    slots: [
      {
        id: uuidv4(),
        name: '',
        tag: '',
        slotValue: [{ id: uuidv4(), name: '', tag: '' }],
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.scenarioASR.createScenario(scenario);
    if (data.status) {
      enqueueSnackbar(t('addScenarioSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(data.message, { variant: 'error' });
    }
  };

  const handleChangeInput = (id, event) => {
    const newSlots = [...scenario.slots];
    newSlots.map((slot) => {
      // eslint-disable-next-line no-param-reassign
      if (id === slot.id) slot[event.target.name] = event.target.value;
      return slot;
    });
    setScenario((prev) => ({ ...prev, slots: newSlots }));
  };

  const handleChangeInputSlotValue = (id, event) => {
    const newSlots = [...scenario.slots];
    newSlots.map((slot) => {
      // eslint-disable-next-line array-callback-return
      slot.slotValue.map((ele) => {
        // eslint-disable-next-line no-param-reassign
        if (id === ele.id) ele[event.target.name] = event.target.value;
      });
      return slot;
    });
    setScenario((prev) => ({ ...prev, slots: newSlots }));
  };

  const handleAddFields = () => {
    setScenario((prev) => ({
      ...prev,
      slots: [
        ...scenario.slots,
        {
          id: uuidv4(),
          name: '',
          tag: '',
          slotValue: [{ id: uuidv4(), name: '', tag: '' }],
        },
      ],
    }));
  };

  const handleAddFieldsSlotValue = (id) => {
    const newSlots = [...scenario.slots];
    const slotArray = newSlots.filter((slot) => slot.id === id);
    slotArray[0].slotValue.push({ id: uuidv4(), name: '', tag: '' });
    setScenario((prev) => ({ ...prev, slots: slotArray }));
  };

  const handleRemoveFields = (id) => {
    const newSlots = [...scenario.slots];
    newSlots.splice(
      newSlots.findIndex((value) => value.id === id),
      1,
    );
    setScenario((prev) => ({ ...prev, slots: newSlots }));
  };

  const handleRemoveFieldsSlotValue = (id) => {
    const newSlots = [...scenario.slots];
    const slotArray = newSlots.filter((x) => x.id === id);
    slotArray[0].slotValue.splice(
      slotArray[0].slotValue.findIndex((value) => value.id === id),
      1,
    );
    setScenario((prev) => ({ ...prev, slots: newSlots }));
  };

  const handleChangeScenario = (e) => {
    e.persist();
    setScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeRoleUser1 = (e) => {
    e.persist();
    const { ...newScenario } = scenario;
    newScenario.roleUser1[e.target.name] = e.target.value;
    setScenario((prev) => ({ ...prev, roleUser1: newScenario.roleUser1 }));
  };

  const handleChangeRoleUser2 = (e) => {
    e.persist();
    const { ...newScenario } = scenario;
    newScenario.roleUser2[e.target.name] = e.target.value;
    setScenario((prev) => ({ ...prev, roleUser2: newScenario.roleUser2 }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle id="form-dialog-title">
        {t('createScenarioForm')}
      </DialogTitle>
      <DialogContent>
        <ScenarioFormStyled>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} className="infoWrapper">
              <Grid item xs={12} sm={3} className="label">
                <Typography className="inputTitle">{t('domain')}</Typography>
              </Grid>
              <Grid item xs={12} sm={9} className="error">
                <TextField
                  placeholder={t('typeDomainData')}
                  className="textInput"
                  name="domain"
                  variant="outlined"
                  value={scenario.domain}
                  onChange={handleChangeScenario}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className="infoWrapper">
              <Grid item xs={12} sm={3} className="label">
                <Typography className="inputTitle">
                  {t('scenarioName')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9} className="error">
                <TextField
                  placeholder={t('typeScenarioName')}
                  className="textInput"
                  name="name"
                  variant="outlined"
                  value={scenario.name}
                  onChange={handleChangeScenario}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className="infoWrapper">
              <Grid item xs={12} sm={3} className="label">
                <Typography className="inputTitle">{t('roleUser1')}</Typography>
              </Grid>
              <Grid item xs={12} sm={9} className="error">
                <TextField
                  placeholder={t('typeRoleName')}
                  className="textInput"
                  name="name"
                  variant="outlined"
                  value={scenario.roleUser1.name}
                  onChange={handleChangeRoleUser1}
                />
                <TextField
                  placeholder={t('typeRoleDescription')}
                  className="textInput"
                  name="description"
                  variant="outlined"
                  value={scenario.roleUser1.description}
                  onChange={handleChangeRoleUser1}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className="infoWrapper">
              <Grid item xs={12} sm={3} className="label">
                <Typography className="inputTitle">{t('roleUser2')}</Typography>
              </Grid>
              <Grid item xs={12} sm={9} className="error">
                <TextField
                  placeholder={t('typeRoleName')}
                  className="textInput"
                  name="name"
                  variant="outlined"
                  value={scenario.roleUser2.name}
                  onChange={handleChangeRoleUser2}
                />
                <TextField
                  placeholder={t('typeRoleDescription')}
                  className="textInput"
                  name="description"
                  variant="outlined"
                  value={scenario.roleUser2.description}
                  onChange={handleChangeRoleUser2}
                />
              </Grid>
            </Grid>
            {scenario.slots.map((slotItem, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid container key={index} spacing={3} className="infoWrapper">
                <Grid item xs={12} sm={3} className="label">
                  <Typography className="inputTitle">{t('slots')}</Typography>
                </Grid>
                <Grid item xs={12} sm={9} className="error">
                  <TextField
                    name="name"
                    placeholder={t('typeSlotName')}
                    variant="outlined"
                    value={slotItem.name}
                    onChange={(event) => handleChangeInput(slotItem.id, event)}
                  />
                  <TextField
                    name="tag"
                    placeholder={t('typeSlotTag')}
                    variant="outlined"
                    value={slotItem.tag}
                    onChange={(event) => handleChangeInput(slotItem.id, event)}
                  />
                  <IconButton
                    disabled={scenario.slots.length === 1}
                    onClick={() => handleRemoveFields(slotItem.id)}
                  >
                    <Remove />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <Add />
                  </IconButton>
                  <div className="slotValue">
                    {slotItem.slotValue.map((element, itemIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={itemIndex}>
                        <TextField
                          name="name"
                          placeholder={t('typeSlotValueName')}
                          variant="outlined"
                          value={element.name}
                          onChange={(event) =>
                            handleChangeInputSlotValue(element.id, event)
                          }
                        />
                        <TextField
                          name="tag"
                          placeholder={t('typeSlotValueTag')}
                          variant="outlined"
                          value={element.tag}
                          onChange={(event) =>
                            handleChangeInputSlotValue(element.id, event)
                          }
                        />
                        <IconButton
                          disabled={slotItem.slotValue.length === 1}
                          onClick={() =>
                            handleRemoveFieldsSlotValue(slotItem.id)
                          }
                        >
                          <Remove />
                        </IconButton>
                        <IconButton
                          onClick={() => handleAddFieldsSlotValue(slotItem.id)}
                        >
                          <Add />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            ))}
          </form>
        </ScenarioFormStyled>
      </DialogContent>
      <DialogActions className="dialogAction">
        <Button onClick={handleClose} color="primary" variant="outlined">
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          {t('createScenario')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
