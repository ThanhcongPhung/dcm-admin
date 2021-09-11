/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Moment from 'moment';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import {
  Button,
  Typography,
  TextField,
  CardActions,
  Grid,
  FormControlLabel,
  MenuItem,
  Checkbox,
  Tooltip,
  FormControl,
  RadioGroup,
  Radio,
  FormHelperText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CloudUpload } from '@material-ui/icons';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import api from '../../apis';
import routes from '../../constants/route';
import { CAMPAIGN_TYPE, CAMPAIGN_VISIBILITY } from '../../constants';
import IntegrateBot from './IntegrateBot';
import { CreateBaseContentsStyled } from './index.style';

const campaignInit = {
  name: '',
  description: '',
  image: '',
  campaignVisibility: CAMPAIGN_VISIBILITY.PUBLIC,
  serviceId: '',
  actions: [],
  campaignType: '',
  startTime: Moment(Date.now() + 1 * 24 * 60 * 60 * 1000).format(
    'YYYY-MM-DDT00:00:00',
  ),
  endTime: Moment(Date.now() + 8 * 24 * 60 * 60 * 1000).format(
    'YYYY-MM-DDT00:00:00',
  ),
  appId: '',
};

export default function BaseContents({
  campaignId,
  services,
  onSetCampaignId,
  onNextStep,
  onCancel,
}) {
  const [actions, setActions] = useState([]);
  const [campaignTypes, setCampaignTypes] = useState([]);
  const [isIntegrateBot, setIsIntegrateBot] = useState(false);
  const [baseCampaign, setBaseCampaign] = useState(campaignInit);
  const [editorStateDesc, setEditorStateDesc] = useState(
    EditorState.createEmpty(),
  );
  const [focusedInput, setFocusedInput] = useState(null);
  const [isFirst, setIsFirst] = useState(true);

  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeBaseCampaign = (e) => {
    e.persist();
    setBaseCampaign((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onEditorStateChange = async (editorState) => {
    setEditorStateDesc(editorState);
    setBaseCampaign((prev) => ({
      ...prev,
      description: JSON.stringify(
        convertToRaw(editorState.getCurrentContent()),
      ),
    }));
  };

  const handleFileSelected = async (e) => {
    if (!e.target.files.length) return;
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('file', file);
    const { data } = await api.upload.uploadFile(formData);
    if (data.status) {
      setBaseCampaign((prev) => ({ ...prev, image: data.result.link }));
    } else {
      enqueueSnackbar(t('fileUploadError'), { variant: 'error' });
    }
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setBaseCampaign((prev) => ({
      ...prev,
      startTime: Moment(startDate).format('YYYY-MM-DDT00:00:00'),
      endTime: Moment(endDate).format('YYYY-MM-DDT23:59:59'),
    }));
  };

  const handleCheckIntegrateBot = (e) => {
    setIsIntegrateBot(e.target.checked);
    if (!e.target.checked) setBaseCampaign((prev) => ({ ...prev, appId: '' }));
  };

  const checkValidChatbot = (type) =>
    [CAMPAIGN_TYPE.CHATBOT_INTENT, CAMPAIGN_TYPE.CHATBOT_USECASE].includes(
      type,
    );
  const checkValidate = () =>
    !baseCampaign.name ||
    !baseCampaign.description ||
    !baseCampaign.serviceId ||
    !baseCampaign.actions.length ||
    !baseCampaign.campaignType;

  const saveCampaign = async (nextStep) => {
    setIsFirst(false);
    if (checkValidate()) return;
    const isValidChatbot = checkValidChatbot(baseCampaign.campaignType);
    if (!baseCampaign.appId && (isIntegrateBot || isValidChatbot)) {
      return enqueueSnackbar(t('needIntegrateBot'), { variant: 'error' });
    }

    let response;
    if (campaignId) {
      response = await api.campaign.updateCampaign({
        campaignId,
        ...baseCampaign,
        description: JSON.stringify(
          convertToRaw(editorStateDesc.getCurrentContent()),
        ),
      });
    } else {
      response = await api.campaign.createCampaign(baseCampaign);
    }

    if (response.data.status) {
      const { result } = response.data;
      setBaseCampaign(campaignInit);
      if (nextStep) {
        onSetCampaignId(result.id);
        onNextStep(result.id);
      } else {
        history.push(routes.CAMPAIGN_MANAGE);
      }
      return '';
    }
    return enqueueSnackbar(t('errorSaveDraft'), { variant: 'error' });
  };

  const handleSaveCampaign = () => saveCampaign(false);

  const handleNextStep = () => saveCampaign(true);

  const handleCancel = () => {
    setBaseCampaign(campaignInit);
    onCancel();
  };

  const fetchService = async (serviceId) => {
    const { data } = await api.service.getService(serviceId);
    if (data.status) {
      setCampaignTypes(data.result.campaignTypes);
      setActions(data.result.actions);
    }
  };

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) {
      setBaseCampaign({ ...data.result, serviceId: data.result.service.id });
      if (data.result.description)
        setEditorStateDesc(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.result.description)),
          ),
        );
      if (data.result.appId) setIsIntegrateBot(true);
    }
  };

  useEffect(() => {
    if (baseCampaign.serviceId) fetchService(baseCampaign.serviceId);
  }, [baseCampaign.serviceId]);

  useEffect(() => {
    if (campaignId) fetchCampaign();
  }, [campaignId]);

  const inValidActions = () =>
    !isFirst && (!baseCampaign.actions || !baseCampaign.actions.length);

  return (
    <CreateBaseContentsStyled>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={3} sm={2} className="label">
          <Typography
            className={clsx('inputTitle', {
              inputError: !baseCampaign.name && !isFirst,
            })}
          >
            {t('campaignName')}
          </Typography>
        </Grid>
        <Grid item xs={9} sm={10}>
          <TextField
            placeholder={t('campaignNamePlaceholder')}
            className="textInput"
            value={baseCampaign.name}
            name="name"
            onChange={handleChangeBaseCampaign}
            variant="outlined"
            error={!baseCampaign.name && !isFirst}
            helperText={!baseCampaign.name && !isFirst && t('fieldNotEmpty')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={3} sm={2} className="label">
          <Typography
            className={clsx('inputTitle', {
              inputError: !baseCampaign.description && !isFirst,
            })}
          >
            {t('description')}
          </Typography>
        </Grid>
        <Grid item xs={9} sm={10}>
          <div
            className={clsx('editor', {
              error: !baseCampaign.description && !isFirst,
            })}
          >
            <Editor
              editorState={editorStateDesc}
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
            {!baseCampaign.description && !isFirst && (
              <FormHelperText error>{t('fieldNotEmpty')}</FormHelperText>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={3} sm={2} className="label">
          <Typography className="inputTitle">{t('image')}</Typography>
        </Grid>
        <Grid item xs={9} sm={10} className="imgUpload">
          {baseCampaign.image && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={baseCampaign.image}
              alt="campaign image"
              className="image"
            />
          )}
          <Button
            variant="contained"
            component="label"
            className="uploadButton"
          >
            <Tooltip title={t('upload')}>
              <CloudUpload color="primary" />
            </Tooltip>
            <input
              accept="image/*"
              multiple
              type="file"
              className="uploadInput"
              onChange={handleFileSelected}
            />
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={3} sm={2} md={2} className="label">
          <Typography
            className={clsx('inputTitle', {
              inputError: !baseCampaign.campaignVisibility && !isFirst,
            })}
          >
            {t('visibility')}
          </Typography>
        </Grid>
        <Grid item xs={9} sm={10} md={4} className="formControlWrapper">
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="campaignVisibility"
              value={baseCampaign.campaignVisibility}
              onChange={handleChangeBaseCampaign}
              className="radio-group"
            >
              {Object.values(CAMPAIGN_VISIBILITY).map((value) => (
                <FormControlLabel
                  value={value}
                  control={<Radio color="primary" />}
                  label={t(value)}
                  className="form-control-label"
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={3} sm={2} md={2} className="label">
          <Typography className="inputTitle">{t('time')}</Typography>
        </Grid>
        <Grid item xs={9} sm={4} md={4} className="date-container">
          <DateRangePicker
            startDate={Moment(baseCampaign.startTime)}
            startDateId="campaign_start_time_id"
            startDatePlaceholderText={t('startDate')}
            endDate={Moment(baseCampaign.endTime)}
            endDateId="campaign_end_time_id"
            endDatePlaceholderText={t('endDate')}
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={(focusedValue) => setFocusedInput(focusedValue)}
            isOutsideRange={(day) => !isInclusivelyAfterDay(day, Moment())}
            numberOfMonths={1}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={3} sm={2} md={2} className="label">
          <Typography
            className={clsx('inputTitle', {
              inputError: !baseCampaign.serviceId && !isFirst,
            })}
          >
            {t('collectDataService')}
          </Typography>
        </Grid>
        <Grid item xs={9} sm={6} md={6}>
          <TextField
            select
            value={baseCampaign.serviceId}
            onChange={handleChangeBaseCampaign}
            name="serviceId"
            variant="outlined"
            className="textInput"
            InputProps={{
              readOnly: !!campaignId,
            }}
            error={!baseCampaign.serviceId && !isFirst}
            helperText={
              !baseCampaign.serviceId && !isFirst && t('fieldNotEmpty')
            }
          >
            {services.map((serviceItem) => (
              <MenuItem
                value={serviceItem.id}
                className="select-component-item"
                key={serviceItem.id}
              >
                {serviceItem.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="infoWrapper">
        {!!actions.length && (
          <>
            <Grid item xs={3} sm={2} className="label">
              <Typography
                className={clsx('inputTitle', { inputError: inValidActions() })}
              >
                {t('campaignAction')}
              </Typography>
            </Grid>
            <Grid item xs={9} sm={4}>
              <Autocomplete
                fullWidth
                multiple
                options={actions}
                getOptionLabel={(option) => t(option)}
                value={baseCampaign.actions}
                onChange={(e, values) =>
                  setBaseCampaign((prev) => ({ ...prev, actions: values }))
                }
                disabled={!!campaignId}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    error={inValidActions()}
                    helperText={inValidActions() && t('fieldNotEmpty')}
                  />
                )}
              />
            </Grid>
          </>
        )}
        {!!campaignTypes.length && (
          <>
            <Grid item xs={3} sm={2} className="label">
              <Typography
                className={clsx('inputTitle', {
                  inputError: !baseCampaign.campaignType && !isFirst,
                })}
              >
                {t('campaignType')}
              </Typography>
            </Grid>
            <Grid item xs={9} sm={4} className="textField">
              <TextField
                select={!!campaignTypes.length}
                value={baseCampaign.campaignType}
                onChange={handleChangeBaseCampaign}
                name="campaignType"
                variant="outlined"
                className="textInput"
                InputProps={{
                  readOnly: !!campaignId,
                }}
                error={!baseCampaign.campaignType && !isFirst}
                helperText={
                  !baseCampaign.campaignType && !isFirst && t('fieldNotEmpty')
                }
              >
                {campaignTypes.length &&
                  campaignTypes.map((type) => (
                    <MenuItem
                      value={type}
                      className="select-component-item"
                      key={type}
                    >
                      {type}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={3} sm={2} className="label">
          <Typography className="inputTitle">{t('integrateBot')}</Typography>
        </Grid>
        <Grid item xs={9} sm={10}>
          <FormControlLabel
            disabled={!!baseCampaign.id && !!baseCampaign.appId}
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                checked={isIntegrateBot}
                name="isIntegrateBot"
                onChange={handleCheckIntegrateBot}
                color="primary"
              />
            }
          />
        </Grid>
      </Grid>
      {isIntegrateBot && (
        <IntegrateBot
          baseCampaign={baseCampaign}
          setBaseCampaign={setBaseCampaign}
          isIntegrateBot={isIntegrateBot}
        />
      )}
      <CardActions className="cardActions">
        <Button variant="outlined" onClick={handleCancel}>
          {t('cancel')}
        </Button>
        {campaignId ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCampaign}
          >
            {t('save')}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCampaign}
          >
            {t('saveAsADraft')}
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleNextStep}>
          {t('next')}
        </Button>
      </CardActions>
    </CreateBaseContentsStyled>
  );
}
