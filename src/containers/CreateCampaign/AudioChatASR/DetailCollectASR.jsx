import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import { v4 as uuidV4 } from 'uuid';
import { DetailCollectASRStyled } from './index.style';
import { MAX_ITEMS_SMALL } from '../../../constants';
import api from '../../../apis';

export default function DetailValidASR() {
  const [scenarios, setScenarios] = useState([]);
  const [scenarioList, setScenarioList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleChangePage = (event, value) => setPage(value);
  const handleChangeScenario = (event, values) => setScenarios(values);

  const fetchScenarios = async (fields) => {
    setIsLoading(true);
    const { offset, search } = fields;
    const { data } = await api.scenarioASR.getScenarios({
      offset,
      search,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      const listData = data.result.scenarios;
      setScenarioList(listData);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScenarios({});
  }, []);

  return (
    <DetailCollectASRStyled>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={2} sm={2} className="label">
          <Typography className="inputTitle">{t('addIntent')}</Typography>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Autocomplete
            multiple
            fullWidth
            getOptionLabel={(option) => option.name}
            options={scenarioList}
            disableCloseOnSelect
            value={scenarios}
            onChange={handleChangeScenario}
            renderInput={(params) => (
              <TextField
                {...params}
                name="intent"
                variant="outlined"
                placeholder={t('chooseIntent')}
                // error={isError}
                // helperText={isError && t('errorAtLeastOneMoreIntent')}
              />
            )}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon color="primary" />}
                  checked={selected}
                />
                {option.name}
              </>
            )}
          />
        </Grid>
        <Grid item xs={2} sm={2} className="label">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            // disabled={!intents.length}
            // onClick={handleCreateIntent}
          >
            {t('add')}
          </Button>
        </Grid>
      </Grid>
      <Table aria-label="simple table" className="table">
        <TableBody>
          {scenarios &&
            scenarios
              .slice(
                page * MAX_ITEMS_SMALL,
                page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
              )
              .map((row, index) => {
                return (
                  <TableRow key={uuidV4()} className="tableRow">
                    <TableCell align="center" className="tableCell">
                      {page * MAX_ITEMS_SMALL + index + 1}
                    </TableCell>
                    <TableCell align="left" className="tableCell">
                      {row.name}
                    </TableCell>
                    <TableCell align="right" className="tableCell">
                      <DeleteIcon
                        className="icon"
                        color="error"
                        // onClick={() => handleDeleteIntent(row)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          {scenarios.length > MAX_ITEMS_SMALL && (
            <TablePagination
              rowsPerPageOptions={[]}
              count={scenarios.length}
              rowsPerPage={MAX_ITEMS_SMALL}
              page={page}
              onPageChange={handleChangePage}
            />
          )}
        </TableBody>
      </Table>
    </DetailCollectASRStyled>
  );
}
