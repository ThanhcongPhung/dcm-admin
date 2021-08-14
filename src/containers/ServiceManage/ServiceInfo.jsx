import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../apis';
import { ServiceInfoStyled } from './index.style';

export default function CreateServer(props) {
  const { open, handleClose, setIsLoading, fetchGetServices, serviceEdit } =
    props;
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [service, setService] = useState({
    name: '',
    description: '',
    inputs: [],
    actions: [],
    url: '',
  });
  const [isFirst, setIsFirst] = useState(true);
  const handleChangeService = (e) => {
    e.persist();
    setService((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddNewInputs = (chip) => {
    if (!service.inputs.includes(chip))
      setService((prev) => ({
        ...prev,
        inputs: [...service.inputs, chip],
      }));
  };

  const handleDeleteNewInputs = (chip) => {
    setService((prev) => ({
      ...prev,
      inputs: service.inputs.filter((input) => input !== chip),
    }));
  };

  const handleAddNewActions = (chip) => {
    if (!service.actions.includes(chip))
      setService((prev) => ({
        ...prev,
        actions: [...service.actions, chip],
      }));
  };

  const handleDeleteNewActions = (chip) => {
    setService((prev) => ({
      ...prev,
      actions: service.actions.filter((action) => action !== chip),
    }));
  };

  const handleConfirmAdd = async () => {
    setIsFirst(false);
    const conditionAdd =
      service.name &&
      service.description &&
      service.inputs.length &&
      service.actions.length &&
      service.url;
    if (conditionAdd) {
      setIsLoading(true);
      const { data } = await api.service.createService(service);
      setIsLoading(false);
      if (data.status) {
        handleClose();
        fetchGetServices({ offset: 0 });
        enqueueSnackbar(t('addServiceSuccess'), { variant: 'success' });
      } else {
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    }
  };

  const handleConfirmEdit = async () => {
    if (
      service.name &&
      service.description &&
      service.inputs.length &&
      service.actions.length &&
      service.url
    ) {
      setIsLoading(true);
      const { data } = await api.service.editService(service);
      setIsLoading(false);
      if (data.status) {
        handleClose();
        fetchGetServices({ offset: 0 });
        enqueueSnackbar(t('editServiceSuccess'), { variant: 'success' });
      } else {
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    if (serviceEdit) {
      setService(serviceEdit);
    }
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogTitle id="form-dialog-title">
        {serviceEdit ? t('editService') : t('createService')}
      </DialogTitle>
      <DialogContent>
        <ServiceInfoStyled>
          <Grid container spacing={3} className="infoWrapper">
            <Grid item xs={12} sm={3} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: service.name === '' && !isFirst,
                })}
              >
                {t('serviceName')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9} className="error">
              <TextField
                placeholder={t('serviceNamePlaceholder')}
                className="textInput"
                value={service.name}
                name="name"
                onChange={handleChangeService}
                variant="outlined"
                error={service.name === '' && !isFirst}
                helperText={
                  service.name === '' && !isFirst ? t('fieldNotEmpty') : ''
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="infoWrapper">
            <Grid item xs={12} sm={3} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: service.description === '' && !isFirst,
                })}
              >
                {t('description')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                placeholder={t('descriptionPlaceholder')}
                multiline
                maxRows="4"
                className="textInput"
                name="description"
                value={service.description}
                onChange={handleChangeService}
                variant="outlined"
                error={service.description === '' && !isFirst}
                helperText={
                  service.description === '' && !isFirst
                    ? t('fieldNotEmpty')
                    : ''
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="infoWrapper textHelper">
            <Grid item xs={12} sm={3} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: !service.inputs.length && !isFirst,
                })}
              >
                {t('serviceInputs')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <ChipInput
                className="textInput"
                placeholder={t('serviceInputsPlaceholder')}
                value={service.inputs}
                autoFocus
                onAdd={(chip) => handleAddNewInputs(chip)}
                onDelete={(chip) => handleDeleteNewInputs(chip)}
                variant="outlined"
                error={!service.inputs.length && !isFirst}
                helperText={
                  !service.inputs.length && !isFirst
                    ? t('fieldNotEmpty')
                    : t('noteCreateInputs')
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="infoWrapper textHelper">
            <Grid item xs={12} sm={3} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: !service.actions.length && !isFirst,
                })}
              >
                {t('serviceActions')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <ChipInput
                className="textInput"
                placeholder={t('serviceActionsPlaceholder')}
                value={service.actions}
                autoFocus
                onAdd={(chip) => handleAddNewActions(chip)}
                onDelete={(chip) => handleDeleteNewActions(chip)}
                variant="outlined"
                error={!service.actions.length && !isFirst}
                helperText={
                  !service.actions.length && !isFirst
                    ? t('fieldNotEmpty')
                    : t('noteCreateAction')
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="infoWrapper">
            <Grid item xs={12} sm={3} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: service.url === '' && !isFirst,
                })}
              >
                {t('url')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                placeholder={t('urlPlaceholder')}
                className="textInput"
                name="url"
                value={service.url}
                onChange={handleChangeService}
                variant="outlined"
                error={service.url === '' && !isFirst}
                helperText={
                  service.url === '' && !isFirst ? t('fieldNotEmpty') : ''
                }
              />
            </Grid>
          </Grid>
          <DialogActions className="dialogAction">
            <Button onClick={handleClose} color="primary" variant="outlined">
              {t('cancel')}
            </Button>
            <Button
              onClick={serviceEdit ? handleConfirmEdit : handleConfirmAdd}
              color="primary"
              variant="contained"
            >
              {serviceEdit ? t('edit') : t('addService')}
            </Button>
          </DialogActions>
        </ServiceInfoStyled>
      </DialogContent>
    </Dialog>
  );
}
