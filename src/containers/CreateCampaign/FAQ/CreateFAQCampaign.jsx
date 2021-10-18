/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Select from '../../../components/TreeDropdown';
import { DetailIntentStyled } from './index.style';
import { getIntents } from '../../../apis/faq';
import { DEFAULT_TARGET } from '../../../constants';

export default function DetailIntent({
  detailCampaign,
  onSetDetailCampaign,
  isError,
}) {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getIntents().then(({ data }) =>
      setCategories(
        data.result.map((item) => ({
          label: item.title,
          value: item.id,
          checked: false,
          intentIds: item.intents.map((child) => child.intentId),
          children: item.intents.map((child) => ({
            label: child.intent,
            value: child.intentId,
            categoryId: item.id,
            checked: false,
          })),
        })),
      ),
    );
  }, []);

  useEffect(() => {
    if (!detailCampaign.target) onSetDetailCampaign('target', DEFAULT_TARGET);
  }, [detailCampaign]);

  const onChange = (curr, selected) => {
    let temp = [];
    selected.forEach((item) => {
      if (item.intentIds && item.intentIds.length > 0) {
        temp = [...temp, ...item.intentIds];
      } else {
        temp.push(item.value);
      }
    });
    onSetDetailCampaign('intents', temp);
  };

  return (
    <DetailIntentStyled>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={2} sm={2} className="label">
          <Typography
            className={clsx('inputTitle', {
              inputError: isError,
            })}
          >
            {t('addIntentGroup')}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={10}>
          <Select
            data={categories}
            texts={{ placeholder: 'Chọn ý định' }}
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <Grid container className="infoWrapper">
        <Grid item sx={2} sm={2} className="label">
          <Typography
            variant="subtitle1"
            className={clsx('inputTitle', {
              inputError: isError,
            })}
          >
            {t('faqCampaingtags')}
          </Typography>
        </Grid>
        <Grid item sx={10} sm={10}>
          <div className="TextField-without-border-radius">
            <Autocomplete
              multiple
              freeSolo
              id="tags-outlined"
              options={[]}
              value={detailCampaign.tags}
              onChange={(event, newValue) => {
                if (newValue) {
                  onSetDetailCampaign('tags', newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Nhập từ khoá liên quan"
                />
              )}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container className="infoWrapper">
        <Grid item sx={2} sm={2} className="label">
          <Typography
            variant="subtitle1"
            className={clsx('inputTitle', {
              inputError: isError,
            })}
          >
            {t('campaignTarget')}
          </Typography>
        </Grid>
        <Grid item sx={4} sm={4}>
          <div className="TextField-without-border-radius">
            <TextField
              variant="outlined"
              defaultValue="200"
              value={detailCampaign.target}
              onChange={(e) => onSetDetailCampaign('target', e.target.value)}
            />
          </div>
        </Grid>
      </Grid>
    </DetailIntentStyled>
  );
}
