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
import { DetailCollectASRStyled } from './index.style';
import { MAX_ITEMS_SMALL } from '../../../constants';
import api from '../../../apis';

export default function DetailValidASR({ onSetCollectAudio, currentScenario }) {
  const [scenarios, setScenarios] = useState([]);
  const [scenarioList, setScenarioList] = useState([]);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  const handleChangePage = (event, value) => setPage(value);
  const handleChangeScenario = (event, values) => setScenarios(values);

  const fetchScenarios = async (fields) => {
    const { offset, search } = fields;
    const { data } = await api.scenarioASR.getScenarios({
      offset,
      search,
      fields: '',
      sort: 'createdAt_desc',
    });
    if (data.status) {
      const listData = data.result.scenarios;
      setScenarioList(listData);
    }
  };

  const handleCreateScenario = () => {
    onSetCollectAudio([...currentScenario, ...scenarios]);
    const tempScenarios = scenarioList.filter(
      (scenario) => !scenarios.find((item) => item.id === scenario.id),
    );
    setScenarioList(tempScenarios);
    setScenarios([]);
  };

  const handleDeleteScenario = (scenario) => {
    const tempScenario = currentScenario.filter(
      (item) => item.id !== scenario.id,
    );
    onSetCollectAudio(tempScenario);
    if (!tempScenario.slice(page * MAX_ITEMS_SMALL).length && page > 0)
      setPage(page - 1);
    setScenarioList((prev) => [scenario, ...prev]);
  };

  useEffect(() => {
    fetchScenarios({});
  }, []);

  return (
    <DetailCollectASRStyled>
      <Grid container spacing={2} className="infoWrapper">
        <Grid item xs={2} sm={2} className="label">
          <Typography className="inputTitle">{t('addScenario')}</Typography>
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
                placeholder={t('chooseScenario')}
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
            disabled={!scenarios.length}
            onClick={handleCreateScenario}
          >
            {t('add')}
          </Button>
        </Grid>
      </Grid>
      <Table aria-label="simple table" className="table">
        <TableBody>
          {currentScenario &&
            currentScenario
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
                      {row.name}
                    </TableCell>
                    <TableCell align="right" className="tableCell">
                      <DeleteIcon
                        className="icon"
                        color="error"
                        onClick={() => handleDeleteScenario(row)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          {currentScenario.length > MAX_ITEMS_SMALL && (
            <TablePagination
              rowsPerPageOptions={[]}
              count={currentScenario.length}
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
