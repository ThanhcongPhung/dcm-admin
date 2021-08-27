import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  TextField,
  Paper,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BackspaceIcon from '@material-ui/icons/Backspace';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import ChatbotIntent from './DetailIntent';
import { CreateUsecaseStyled } from './index.style';

export default function CreateUsecase({
  chooseIntents,
  usecase,
  setUsecase,
  intents,
  setIntents,
  showSelect,
  isFirst,
  isLoadIntent,
  handleCancel,
  handleSave,
  handleDelete,
}) {
  const { t } = useTranslation();

  const handleChangeUsecase = (e) => {
    e.persist();
    setUsecase((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const ButtonAction = () => (
    <>
      {showSelect && (
        <Tooltip title={t('cancel')}>
          <IconButton className="iconButton" onClick={handleCancel}>
            <BackspaceIcon color="secondary" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={t('save')}>
        <IconButton className="iconButton buttonSuccess" onClick={handleSave}>
          <CheckCircleIcon className="success" />
        </IconButton>
      </Tooltip>
      {!!usecase.id && (
        <Tooltip title={t('delete')}>
          <IconButton className="iconButton" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );

  return (
    <CreateUsecaseStyled>
      <Paper variant="outlined" className="usecase">
        <CardHeader
          avatar={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Avatar
              className="avatar"
              variant="rounded"
              src={`${process.env.PUBLIC_URL}/images/usecase-icon.png`}
            />
          }
          title={!usecase.id ? t('addUsecase') : t('editUsecase')}
          action={<ButtonAction />}
        />
        <CardContent className="content">
          <Grid container spacing={2} className="infoWrapper">
            <Grid item xs={12} sm={2} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: !usecase.name && !isFirst,
                })}
              >
                {t('usecaseName')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                placeholder={t('usecaseNamePlaceholder')}
                className="textInput"
                value={usecase.name}
                name="name"
                onChange={handleChangeUsecase}
                variant="outlined"
                error={!usecase.name && !isFirst}
                helperText={!usecase.name && !isFirst && t('fieldNotEmpty')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className="infoWrapper">
            <Grid item xs={12} sm={2} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: !usecase.description && !isFirst,
                })}
              >
                {t('usecaseDescription')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                className="textInput"
                placeholder={t('usecaseDescriptionPlaceholder')}
                value={usecase.description}
                multiline
                rows={4}
                name="description"
                onChange={handleChangeUsecase}
                variant="outlined"
                error={!usecase.description && !isFirst}
                helperText={
                  !usecase.description && !isFirst && t('fieldNotEmpty')
                }
              />
            </Grid>
          </Grid>
          <ChatbotIntent
            currentIntents={intents}
            onSetCurrentIntents={setIntents}
            chooseIntents={chooseIntents}
            isError={!intents.length && !isFirst}
            isLoadIntent={isLoadIntent}
          />
        </CardContent>
      </Paper>
    </CreateUsecaseStyled>
  );
}
