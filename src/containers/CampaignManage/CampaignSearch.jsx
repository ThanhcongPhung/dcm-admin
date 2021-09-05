import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SearchInput from '../../components/SearchInput';
import { CAMPAIGN_STATUS, CAMPAIGN_VISIBILITY } from '../../constants';
import { CampaignSearchStyled } from './index.style';

export default function CampaignSearch({
  services,
  onHandleSearchName,
  campaignSearch,
  onHandleChangeSearch,
}) {
  const { t } = useTranslation();

  return (
    <CampaignSearchStyled>
      <div className="search-information">
        <SearchInput
          onHandleSearch={onHandleSearchName}
          title="searchCampaign"
        />
      </div>
      <FormControl variant="outlined" className="search-information">
        <InputLabel>{t('collectDataService')}</InputLabel>
        <Select
          label={t('collectDataService')}
          name="serviceId"
          value={campaignSearch.serviceId}
          onChange={onHandleChangeSearch}
        >
          <MenuItem value="total">{t('total')}</MenuItem>
          {services.map((serviceItem) => (
            <MenuItem value={serviceItem.id} key={serviceItem.id}>
              {serviceItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className="search-information">
        <InputLabel>{t('campaignVisibility')}</InputLabel>
        <Select
          label={t('campaignVisibility')}
          name="campaignVisibility"
          value={campaignSearch.campaignVisibility}
          onChange={onHandleChangeSearch}
        >
          <MenuItem value="total">{t('total')}</MenuItem>
          {Object.values(CAMPAIGN_VISIBILITY).map((value) => (
            <MenuItem value={value} key={value}>
              {t(value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className="search-information">
        <InputLabel>{t('status')}</InputLabel>
        <Select
          label={t('status')}
          name="status"
          value={campaignSearch.status}
          onChange={onHandleChangeSearch}
        >
          <MenuItem value="total">{t('total')}</MenuItem>
          {Object.values(CAMPAIGN_STATUS).map((value) => (
            <MenuItem value={value} key={value}>
              {t(value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CampaignSearchStyled>
  );
}
