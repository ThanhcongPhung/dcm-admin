import React, { useRef } from 'react';
import debounce from 'lodash/debounce';
import { TextField, InputAdornment, Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SearchInputStyled } from './index.style';

export default function SearchInput({ search, setSearch, onHandleSearch }) {
  const { t } = useTranslation();

  const delaySearch = useRef(
    debounce(async (searchValue) => {
      onHandleSearch(searchValue);
    }, 800),
  ).current;

  const onHandleSearchFields = (e) => {
    e.persist();
    setSearch(e.target.value);
    delaySearch(e.target.value);
  };

  return (
    <SearchInputStyled>
      <TextField
        value={search}
        onChange={onHandleSearchFields}
        name="search"
        variant="outlined"
        className="searchInput"
        placeholder={t('searchService')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon>search</Icon>
            </InputAdornment>
          ),
        }}
      />
    </SearchInputStyled>
  );
}
