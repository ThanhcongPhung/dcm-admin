/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Typography,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Usecase from './CreateUsecase';
import { DetailUsecaseStyled } from './index.style';

const usecaseInit = { id: '', name: '', description: '' };

export default function DetailUsecase({
  campUsecases,
  onSetCampUsecases,
  campaignIntents,
}) {
  const [chooseIntents, setChooseIntents] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [usecase, setUsecase] = useState(usecaseInit);
  const [intents, setIntents] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [showSelect, setShowSelect] = useState(false);
  const [isLoadIntent, setIsLoadIntent] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickAdd = () => {
    setIsFirst(true);
    setIsShow(true);
    setIntents([]);
    setIsLoadIntent(true);
    setUsecase(usecaseInit);
    setChooseIntents(campaignIntents);
    if (campUsecases.length >= 1) setShowSelect(true);
  };
  const handleSelectUsecase = (e) => {
    const usecaseExist = campUsecases.find(
      (item) => item.id === e.target.value,
    );
    if (usecaseExist) {
      setIsShow(true);
      const intentExists = campaignIntents.filter((intentItem) =>
        usecaseExist.intents.every((item) => item.id !== intentItem.id),
      );
      setChooseIntents(intentExists);
      setIntents(usecaseExist.intents);
      setUsecase(usecaseExist);
    }
  };

  const onCancel = () => {
    setIsShow(false);
    setIsFirst(true);
    setUsecase(usecaseInit);
    setIntents([]);
    setIsLoadIntent(false);
  };

  const handleSave = () => {
    setIsFirst(false);
    setIsLoadIntent(false);
    if (!usecase.name || !usecase.description || !intents.length) return;
    if (usecase.id) {
      const index = campUsecases.findIndex((item) => item.id === usecase.id);
      const temp = campUsecases;
      temp[index] = usecase;
      onSetCampUsecases(temp);
      if (campUsecases.length >= 2) onCancel();
      return enqueueSnackbar(t('editUsecaseSuccess'), { variant: 'success' });
    }
    const ucId = uuidV4();
    onSetCampUsecases([...campUsecases, { ...usecase, id: ucId, intents }]);
    if (!campUsecases.length) {
      setShowSelect(false);
      setUsecase({ ...usecase, id: ucId, intents });
    } else {
      onCancel();
    }
    return enqueueSnackbar(t('addUsecaseSuccess'), { variant: 'success' });
  };

  const handleDelete = () => {
    onSetCampUsecases(campUsecases.filter((item) => item.id !== usecase.id));
    if (campUsecases.length === 2) {
      setShowSelect(false);
      setIsLoadIntent(false);
      setUsecase(campUsecases.filter((item) => item.id !== usecase.id)[0]);
    } else {
      onCancel();
    }
    return enqueueSnackbar(t('deleteUsecaseSuccess'), { variant: 'success' });
  };

  const handleCancel = () => {
    if (campUsecases.length === 1) {
      setShowSelect(false);
      setUsecase(campUsecases[0]);
    } else {
      onCancel();
    }
  };

  useEffect(() => {
    if (campUsecases.length >= 2) setShowSelect(true);
    if (campUsecases.length === 1) {
      setIsShow(true);
      setUsecase(campUsecases[0]);
      if (campUsecases[0].intents && campUsecases[0].intents.length) {
        setIntents(campUsecases[0].intents);
        const intentExists = campaignIntents.filter((intentItem) =>
          campUsecases[0].intents.every((item) => item.id !== intentItem.id),
        );
        setChooseIntents(intentExists);
      }
    }
  }, [campUsecases]);

  return (
    <DetailUsecaseStyled>
      <div className="header">
        <Typography variant="h6">{t('usecase')}</Typography>
        <Tooltip title={t('addUsecase')} aria-label="add">
          <IconButton onClick={handleClickAdd}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="content">
        {showSelect && (
          <TextField
            select
            fullWidth
            value={usecase.id}
            onChange={handleSelectUsecase}
            name="usecase"
            variant="outlined"
            className="textInput"
            label={t('chooseUsecase')}
          >
            {campUsecases.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {t(item.name)}
              </MenuItem>
            ))}
          </TextField>
        )}
        {isShow && (
          <Usecase
            chooseIntents={chooseIntents}
            usecase={usecase}
            setUsecase={setUsecase}
            intents={intents}
            setIntents={setIntents}
            showSelect={showSelect}
            isFirst={isFirst}
            isLoadIntent={isLoadIntent}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </DetailUsecaseStyled>
  );
}
