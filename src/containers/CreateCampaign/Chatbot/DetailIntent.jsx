import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  Button,
  TextField,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Checkbox,
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Autocomplete } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import { MAX_ITEMS_SMALL } from '../../../constants';
import { DetailIntentStyled } from './index.style';

export default function DetailIntent({
  currentIntents,
  onSetCurrentIntents,
  chooseIntents,
  isLoadIntent,
  isError,
}) {
  const [autoIntents, setAutoIntents] = useState([]);
  const [intents, setIntents] = useState([]);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const currentCampIntents = useRef(currentIntents);

  const handleChangePage = (event, value) => setPage(value);

  const handleChangeIntent = (event, values) => setIntents(values);

  const handleCreateIntent = () => {
    onSetCurrentIntents([...currentIntents, ...intents]);
    const tempIntents = autoIntents.filter(
      (intent) => !intents.find((item) => item.id === intent.id),
    );
    setAutoIntents(tempIntents);
    setIntents([]);
  };

  const handleDeleteIntent = (intentDelete) => {
    const intentList = currentIntents.filter(
      (item) => item.id !== intentDelete.id,
    );
    onSetCurrentIntents(intentList);
    if (!intentList.slice(page * MAX_ITEMS_SMALL).length && page > 0)
      setPage(page - 1);
    setAutoIntents((prev) => [intentDelete, ...prev]);
  };

  useEffect(() => {
    if (chooseIntents) setAutoIntents(chooseIntents);
    setPage(0);
  }, [chooseIntents, isLoadIntent]);

  useEffect(() => {
    currentCampIntents.current = currentIntents;
  }, [currentIntents]);

  return (
    <DetailIntentStyled>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={2} sm={2} className="label">
          <Typography
            className={clsx('inputTitle', {
              inputError: isError,
            })}
          >
            {t('addIntent')}
          </Typography>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Autocomplete
            multiple
            fullWidth
            getOptionLabel={(option) => option.displayName}
            options={autoIntents}
            disableCloseOnSelect
            value={intents}
            onChange={handleChangeIntent}
            renderInput={(params) => (
              <TextField
                {...params}
                name="intent"
                variant="outlined"
                placeholder={t('chooseIntent')}
                error={isError}
                helperText={isError && t('errorAtLeastOneMoreIntent')}
              />
            )}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon color="primary" />}
                  checked={selected}
                />
                {option.displayName}
              </>
            )}
          />
        </Grid>
        <Grid item xs={2} sm={2} className="label">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!intents.length}
            onClick={handleCreateIntent}
          >
            {t('add')}
          </Button>
        </Grid>
      </Grid>
      <Table aria-label="simple table" className="table">
        <TableBody>
          {currentIntents &&
            currentIntents
              .slice(
                page * MAX_ITEMS_SMALL,
                page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
              )
              .map((row, index) => {
                return (
                  <TableRow key={row.id} className="tableRow">
                    <TableCell align="center" className="tableCell">
                      {page * MAX_ITEMS_SMALL + index + 1}
                    </TableCell>
                    <TableCell align="left" className="tableCell">
                      {row.displayName}
                    </TableCell>
                    <TableCell align="right" className="tableCell">
                      <DeleteIcon
                        className="icon"
                        color="error"
                        onClick={() => handleDeleteIntent(row)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          {currentIntents.length > MAX_ITEMS_SMALL && (
            <TablePagination
              rowsPerPageOptions={[]}
              count={currentIntents.length}
              rowsPerPage={MAX_ITEMS_SMALL}
              page={page}
              onPageChange={handleChangePage}
            />
          )}
        </TableBody>
      </Table>
    </DetailIntentStyled>
  );
}
