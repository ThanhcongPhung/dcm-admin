import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ConversationSearchStyled } from './index.style';

const AutocompleteCustom = ({ items, value, onChange, label, varName }) => {
  return (
    <Autocomplete
      size="small"
      options={items}
      value={items.find((el) => el.id === value)}
      getOptionLabel={(option) => option.name}
      onChange={(e, newValue) => {
        onChange(varName, newValue.id);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};

export default function ConversationSearch({
  domains = [],
  campaigns = [],
  users = [],
  handleChangeSearch,
  dataSearch,
}) {
  const { t } = useTranslation();

  return (
    <ConversationSearchStyled>
      <div className="searchItem">
        <AutocompleteCustom
          items={domains}
          value={dataSearch && dataSearch.domainId}
          onChange={handleChangeSearch}
          label={t('selectDomain')}
          varName="domainId"
        />
      </div>
      <div className="searchItem">
        <AutocompleteCustom
          items={campaigns}
          value={dataSearch && dataSearch.campaignId}
          onChange={handleChangeSearch}
          label={t('selectCampaign')}
          varName="campaignId"
        />
      </div>
      <div className="searchItem">
        <AutocompleteCustom
          items={users}
          value={dataSearch && dataSearch.agentId}
          onChange={handleChangeSearch}
          label={t('selectAgent')}
          varName="agentId"
        />
      </div>
      <div className="searchItem">
        <AutocompleteCustom
          items={users}
          value={dataSearch && dataSearch.clientId}
          onChange={handleChangeSearch}
          label={t('selectClient')}
          varName="clientId"
        />
      </div>
    </ConversationSearchStyled>
  );
}
