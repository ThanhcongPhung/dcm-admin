import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SubCategory from './SubCategory';
import { FormBaseStyle } from './index.style';

export default function CategoryBase({
  category = {},
  setCategory,
  pageType,
  submitted,
  deleteField,
  setDeleteField,
}) {
  const { t } = useTranslation();

  const handleChangeInput = async (e) => {
    e.persist();
    await setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddChild = async () => {
    const inputFields = [
      ...category.childs,
      { id: uuidv4(), userSay: '', status: 'new' },
    ];
    await setCategory((prev) => ({
      ...prev,
      childs: inputFields,
    }));
  };

  return (
    <FormBaseStyle>
      <Grid container className="fieldWrapper">
        <Grid item xs={2} sm={2}>
          <Typography variant="subtitle1" className="title">
            {t('categoryTitle')}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={10}>
          <TextField
            inputProps={{ 'aria-label': 'naked' }}
            name="title"
            variant="outlined"
            fullWidth
            error={submitted && !category.title}
            helperText={
              submitted && !category.title ? `${t('requiedField')}` : ''
            }
            value={category.title}
            onChange={handleChangeInput}
            placeholder={t('categoryPlaceholder')}
            readOnly={pageType === 'view'}
          />
        </Grid>
      </Grid>
      <Grid container className="fieldWrapper">
        <Grid item sx={2} sm={2}>
          <Typography variant="subtitle1" gutterBottom className="title">
            {t('description')}
          </Typography>
        </Grid>
        <Grid item sx={10} sm={10}>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            maxRows={4}
            name="description"
            placeholder={t('categoryDescription')}
            value={category.description}
            onChange={handleChangeInput}
            readOnly={pageType === 'view'}
          />
        </Grid>
      </Grid>
      <Grid container className="campaign-container">
        <Grid item sx={2} sm={2} className="addSubCategory">
          <Typography
            variant="subtitle1"
            gutterBottom
            className="title pointer text-link"
            onClick={handleAddChild}
          >
            {t('addSubCategory')}
          </Typography>
        </Grid>
        <Grid item sx={10} sm={10}>
          {category && (
            <SubCategory
              field="childs"
              valueKey="title"
              pageType={pageType}
              inputFields={category.childs}
              setInputFields={setCategory}
              placeholder={t('categoryPlaceholder')}
              deleteField={deleteField}
              setDeleteField={setDeleteField}
            />
          )}
        </Grid>
      </Grid>
    </FormBaseStyle>
  );
}
