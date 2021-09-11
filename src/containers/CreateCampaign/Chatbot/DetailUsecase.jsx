/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Tooltip,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TablePagination,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Usecase from './CreateUsecase';
import { MAX_ITEMS_SMALL } from '../../../constants';
import { DetailUsecaseStyled } from './index.style';

const usecaseInit = { id: '', name: '', description: '' };

export default function DetailUsecase({
  campUsecases,
  onSetCampUsecases,
  campaignIntents,
}) {
  const [chooseIntents, setChooseIntents] = useState([]);
  const [usecase, setUsecase] = useState(usecaseInit);
  const [intents, setIntents] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [isLoadIntent, setIsLoadIntent] = useState(false);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangePage = (event, value) => setPage(value);

  const handleClickAdd = () => {
    setIsFirst(true);
    setIntents([]);
    setIsLoadIntent(true);
    setUsecase(usecaseInit);
    setChooseIntents(campaignIntents);
  };

  const handleSelectUsecase = (selectUsecase) => {
    const usecaseExist = campUsecases.find(
      (item) => item.id === selectUsecase.id,
    );
    if (usecaseExist) {
      const intentExists = campaignIntents.filter((intentItem) =>
        usecaseExist.intents.every((item) => item.id !== intentItem.id),
      );
      setChooseIntents(intentExists);
      setIntents(usecaseExist.intents);
      setUsecase(usecaseExist);
    }
  };

  const onCancel = () => {
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
      return enqueueSnackbar(t('editUsecaseSuccess'), { variant: 'success' });
    }
    const ucId = uuidV4();
    onSetCampUsecases([...campUsecases, { ...usecase, id: ucId, intents }]);
    setUsecase({ ...usecase, id: ucId, intents });
    return enqueueSnackbar(t('addUsecaseSuccess'), { variant: 'success' });
  };

  const handleDelete = () => {
    const usecaseList = campUsecases.filter((item) => item.id !== usecase.id);
    onSetCampUsecases(usecaseList);
    if (!usecaseList.slice(page * MAX_ITEMS_SMALL).length && page > 0)
      setPage(page - 1);
    if (campUsecases.length === 2) {
      setIsLoadIntent(false);
      setUsecase(campUsecases.filter((item) => item.id !== usecase.id)[0]);
    } else {
      onCancel();
    }
    return enqueueSnackbar(t('deleteUsecaseSuccess'), { variant: 'success' });
  };

  const handleCancel = () => {
    if (campUsecases.length === 1) {
      setUsecase(campUsecases[0]);
    } else {
      onCancel();
    }
  };

  useEffect(() => {
    if (campUsecases.length === 1) {
      setUsecase(campUsecases[0]);
      if (campUsecases[0].intents && campUsecases[0].intents.length) {
        setIntents(campUsecases[0].intents);
        const intentExists = campaignIntents.filter((intentItem) =>
          campUsecases[0].intents.every((item) => item.id !== intentItem.id),
        );
        setChooseIntents(intentExists);
      }
    }
    if (!campUsecases.length) setChooseIntents(campaignIntents);
  }, [campUsecases]);

  return (
    <DetailUsecaseStyled>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div className="header">
            <Typography variant="h6">{t('usecase')}</Typography>
            <Tooltip title={t('addUsecase')} aria-label="add">
              <IconButton onClick={handleClickAdd}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
          <List className="list">
            {campUsecases &&
              campUsecases
                .slice(
                  page * MAX_ITEMS_SMALL,
                  page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
                )
                .map((item) => (
                  <ListItem
                    button
                    className={clsx('listItem', {
                      activeList: usecase.id === item.id,
                    })}
                    key={item.id}
                    onClick={() => handleSelectUsecase(item)}
                  >
                    <ListItemIcon>
                      <DescriptionIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
            {campUsecases.length > MAX_ITEMS_SMALL && (
              <TablePagination
                rowsPerPageOptions={[]}
                count={campUsecases.length}
                rowsPerPage={MAX_ITEMS_SMALL}
                page={page}
                onChangePage={handleChangePage}
              />
            )}
            {!campUsecases.length && (
              <div className="noData">
                <Typography variant="body1" align="center">
                  {t('usecaseNoItem')}
                </Typography>
              </div>
            )}
          </List>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Usecase
            chooseIntents={chooseIntents}
            usecase={usecase}
            setUsecase={setUsecase}
            intents={intents}
            setIntents={setIntents}
            isFirst={isFirst}
            isLoadIntent={isLoadIntent}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
          />
        </Grid>
      </Grid>
    </DetailUsecaseStyled>
  );
}
