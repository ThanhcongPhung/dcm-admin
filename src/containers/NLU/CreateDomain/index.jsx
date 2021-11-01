import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Tooltip,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import { useSnackbar } from 'notistack';
import SlotTable from './SlotTable';
import { CreateDomainStyled } from './index.style';
import api from '../../../apis';
import CreateSlotPatternModal from './CreateSlotPatternModal';

export default function CreateIntentModal() {
  const { domainId } = useParams();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const [intents, setIntents] = useState();
  const [campaigns, setCampaigns] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [domainData, setDomainData] = useState({ patternSlots: [] });
  const [domainDataError, setDomainDataError] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [patternSlotEdit, setPatternSlotEdit] = useState();

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setPatternSlotEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDomainData({
      ...domainData,
      [name]: value,
    });
  };

  const handleUpdateDomain = async () => {
    setIsLoading(true);
    const { name, agentScript, clientScript, campaign, intent, patternSlots } =
      domainData;
    const { data } = await api.nluDomain.updateDomain(domainId, {
      name,
      agentScript,
      clientScript,
      campaign,
      intent,
      patternSlots,
    });
    setIsLoading(false);
    if (data && data.status) {
      enqueueSnackbar(t('updateDomainSuccess'), { variant: 'success' });
      history.push('/admin/nlu/domains');
    } else {
      enqueueSnackbar(t('updateDomainError'), { variant: 'error' });
    }
  };

  const handleCreateDomain = async () => {
    setIsLoading(true);
    const { name, agentScript, clientScript, campaign, intent, patternSlots } =
      domainData;
    const { data } = await api.nluDomain.createDomain({
      name,
      agentScript,
      clientScript,
      campaign,
      intent,
      patternSlots,
    });
    setIsLoading(false);
    if (data && data.status) {
      enqueueSnackbar(t('createDomainSuccess'), { variant: 'success' });
      history.push('/admin/nlu/domains');
    } else {
      enqueueSnackbar(t('createDomainError'), { variant: 'error' });
    }
  };

  const validateDomainData = () => {
    const { patternSlots } = domainData;
    const error = {};
    ['name', 'agentScript', 'clientScript', 'campaign', 'intent'].forEach(
      (el) => {
        if (!domainData[el]) error[el] = 'requiredField';
      },
    );
    if (!patternSlots || !patternSlots.length)
      error.patternSlots = 'requiredField';
    if (error && Object.keys(error).length) {
      setDomainDataError({ ...error });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateDomainData()) return;
    if (domainId) {
      handleUpdateDomain();
      return;
    }
    handleCreateDomain();
  };

  const handleOpenEditPatternSlot = (patternSlotIdx) => {
    const tempPatternSlot = {};
    domainData.patternSlots[patternSlotIdx].forEach((el) => {
      tempPatternSlot[el.slot] = el.value;
    });
    setPatternSlotEdit({ ...tempPatternSlot, index: patternSlotIdx });
    setOpenCreateModal(true);
  };

  const getSlotsIntent = (intentId) => {
    const { slots } = intents.find((el) => el.id === intentId);
    return slots;
  };

  const handleCreatePatternSlot = (newPatternSlotObj) => {
    const slots = getSlotsIntent(domainData.intent);
    const newPatternSlot = slots.map((el) => ({
      slot: el.id,
      value: newPatternSlotObj[el.id],
    }));
    setDomainData({
      ...domainData,
      patternSlots: [[...newPatternSlot], ...domainData.patternSlots],
    });
  };

  const handleUpdatePatternSlot = (patternSlotUpdate) => {
    const slots = getSlotsIntent(domainData.intent);
    const newPatternSlots = [...domainData.patternSlots];
    const tempPatternSlotUpdate = slots.map((el) => ({
      slot: el.id,
      value: patternSlotUpdate[el.id],
    }));
    newPatternSlots[patternSlotUpdate.index] = [...tempPatternSlotUpdate];
    setDomainData({
      ...domainData,
      patternSlots: [...newPatternSlots],
    });
  };

  const handleDeletePatternSlot = (patternSlotDeleteIdx) => {
    const newPatternSlots = [...domainData.patternSlots];
    newPatternSlots.splice(patternSlotDeleteIdx, 1);
    setDomainData({
      ...domainData,
      patternSlots: [...newPatternSlots],
    });
  };

  const fetchIntents = async () => {
    const { data } = await api.nluIntent.getIntents({});
    if (data && data.status) {
      setIntents(data.result.intents);
    }
  };

  const fetchCampaigns = async () => {
    const { data } = await api.campaign.getCampaigns({});
    if (data && data.status) {
      setCampaigns(data.result.campaigns);
    }
  };

  const fetchDomain = async () => {
    const { data } = await api.nluDomain.getDomain(domainId);
    if (data && data.status) {
      setDomainData(data.result);
    }
  };

  useEffect(() => {
    if (domainId) fetchDomain();
  }, [domainId]);

  useEffect(() => {
    fetchIntents();
    fetchCampaigns();
  }, []);

  if (!intents || !campaigns || (domainId && !domainData) || isLoading)
    return <CircularProgress />;

  return (
    <CreateDomainStyled>
      <Paper elevation={3} className="paper">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t(!domainId ? 'addDomain' : 'updateDomain')}
          </Typography>
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
              name="name"
              multiline
              value={domainData && domainData.name}
              onChange={handleChange}
              error={domainDataError && domainDataError.name}
              helperText={domainDataError && t(domainDataError.name)}
            />
          </div>
          <div className="nameItem">
            <Typography variant="body1" className="label">
              {t('agentScript')}
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              name="agentScript"
              multiline
              value={domainData && domainData.agentScript}
              onChange={handleChange}
              error={domainDataError && domainDataError.agentScript}
              helperText={domainDataError && t(domainDataError.agentScript)}
            />
          </div>
          <div className="nameItem">
            <Typography variant="body1" className="label">
              {t('clientScript')}
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              name="clientScript"
              multiline
              value={domainData && domainData.clientScript}
              onChange={handleChange}
              error={domainDataError && domainDataError.clientScript}
              helperText={domainDataError && t(domainDataError.clientScript)}
            />
          </div>
          <div className="nameItem">
            <Typography variant="body1" className="label">
              {t('campaign')}
            </Typography>
            <Autocomplete
              size="small"
              options={campaigns}
              value={
                domainData &&
                domainData.campaign &&
                campaigns.find((el) => el.id === domainData.campaign)
              }
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) => {
                setDomainData({
                  ...domainData,
                  campaign: newValue.id,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('selectCampaign')}
                  variant="outlined"
                  error={domainDataError && domainDataError.campaign}
                  helperText={domainDataError && t(domainDataError.campaign)}
                />
              )}
            />
          </div>
          <div className="nameItem">
            <Typography variant="body1" className="label">
              {t('intent')}
            </Typography>
            <Autocomplete
              size="small"
              options={intents}
              value={
                domainData &&
                domainData.intent &&
                intents.find((el) => el.id === domainData.intent)
              }
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) => {
                setDomainData({
                  ...domainData,
                  intent: newValue.id,
                  patternSlots: [],
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('selectIntent')}
                  variant="outlined"
                  error={domainDataError && domainDataError.intent}
                  helperText={domainDataError && t(domainDataError.intent)}
                />
              )}
            />
          </div>
          {domainData && domainData.intent && (
            <div className="nameItem">
              <div className="slotHeader">
                <Typography variant="body1" className="label">
                  {t('slots')}
                </Typography>
                <div className="headButtons">
                  <Tooltip title={t('addDomain')}>
                    <Button
                      variant="contained"
                      color="primary"
                      className="addBtn"
                      startIcon={<AddIcon />}
                      onClick={handleOpenCreateModal}
                    >
                      {t('add')}
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <SlotTable
                slots={getSlotsIntent(domainData.intent)}
                patternSlots={domainData && domainData.patternSlots}
                handleEdit={handleOpenEditPatternSlot}
                handleDelete={handleDeletePatternSlot}
              />
              <div className="errorText">
                {domainDataError && t(domainDataError.patternSlots)}
              </div>
              <CreateSlotPatternModal
                slot={patternSlotEdit}
                slots={getSlotsIntent(domainData.intent)}
                open={openCreateModal}
                handleClose={handleCloseCreateModal}
                handleCreate={handleCreatePatternSlot}
                handleUpdate={handleUpdatePatternSlot}
              />
            </div>
          )}
        </div>
        <div className="btnContainer">
          <Button variant="outlined" color="primary" onClick={handleSave}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </CreateDomainStyled>
  );
}
