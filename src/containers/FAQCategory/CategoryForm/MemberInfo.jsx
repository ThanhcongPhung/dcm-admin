import React, { useState, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Button,
  TablePagination,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../../apis';
import { MAX_ITEMS_SMALL } from '../../../constants';
import { MemberInfoStyle } from './index.style';

export default function MemberInfo({ category = {}, setCategory, pageType }) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [newParticipant, setNewParticipant] = useState({
    userId: '',
    email: '',
  });
  const [accounts, setAccounts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChangePage = (value) => setPage(value);

  const handleClickAddUser = () => {
    const userExist = category.members.findIndex(
      (item) => item.userId === newParticipant.userId,
    );
    if (userExist >= 0) {
      setInputValue('');
      setNewParticipant({});
      enqueueSnackbar(t('emailExistError'), { variant: 'error' });
      return;
    }
    setCategory((prev) => ({
      ...prev,
      members: [
        ...category.members,
        {
          userId: newParticipant.userId,
          email: newParticipant.email,
        },
      ],
    }));
    setInputValue('');
    setNewParticipant({ email: '', userId: '' });
    setAccounts([]);
  };

  const handleDeleteEmail = ({ parDelete }) => {
    const emailList = category.members.filter(
      (item) => item.userId !== parDelete,
    );
    setCategory((prev) => ({ ...prev, members: emailList }));
  };

  const delaySearch = useRef(
    debounce(async (searchValue) => {
      if (searchValue.trim() !== '') {
        const data = await api.faqStaff.getStaffs({
          searchString: searchValue,
        });
        if (data.result && data.result.length > 0) {
          setAccounts(data.result);
        }
      } else {
        setAccounts([]);
      }
    }, 800),
  ).current;
  useEffect(() => {
    if (inputValue === '') {
      setAccounts(newParticipant.email ? [newParticipant.email] : []);
    }
    delaySearch(inputValue);
  }, [newParticipant.email, inputValue]);

  return (
    <MemberInfoStyle>
      <Card className="card card-participant-container">
        <div className="cardHeader">
          <Typography variant="h5" className="headerText">
            {t('participant')}
          </Typography>
        </div>
        <div className="cardBody">
          {pageType !== 'view' && (
            <Grid className="add-participant" container spacing="2">
              <Grid item sx={9} sm={9}>
                <Autocomplete
                  className="emailField"
                  fullWidth
                  options={accounts}
                  getOptionLabel={(option) =>
                    option.email ? option.email : option
                  }
                  getOptionSelected={(o, v) => o.email && v && o.email === v}
                  autoComplete
                  autoHighlight
                  includeInputInList
                  filterSelectedOptions
                  noOptionsText={t('noOptions')}
                  value={newParticipant.email}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setAccounts([newValue, ...accounts]);
                      setNewParticipant({
                        ...newParticipant,
                        email: newValue.email,
                        userId: newValue.id,
                      });
                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={t('enterEmail')}
                      name="email"
                    />
                  )}
                  renderOption={(option) => (
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs>
                        <Typography>{option.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {option.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                />
              </Grid>
              <Grid item sx={3} sm={3}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={handleClickAddUser}
                  disabled={!newParticipant.userId}
                >
                  {t('add')}
                </Button>
              </Grid>
            </Grid>
          )}
          <TableContainer className="table-container">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {t('sumParticipant')} : {category.members.length}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {category.members &&
                  category.members
                    .slice(
                      page * MAX_ITEMS_SMALL,
                      page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
                    )
                    .map((item, index) => (
                      <TableRow key={item.email}>
                        <TableCell component="th" scope="row">
                          {page * MAX_ITEMS_SMALL + index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.email}
                        </TableCell>
                        {pageType !== 'view' && (
                          <TableCell>
                            <DeleteIcon
                              color="secondary"
                              className="icon icon-delete"
                              onClick={() =>
                                handleDeleteEmail({
                                  parDelete: item.userId,
                                })
                              }
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                {category.members &&
                  category.members.length > MAX_ITEMS_SMALL && (
                    <TablePagination
                      rowsPerPageOptions={[]}
                      count={category.members && category.members.length}
                      rowsPerPage={MAX_ITEMS_SMALL}
                      page={page}
                      onPageChange={(event, newPage) =>
                        handleChangePage(newPage)
                      }
                    />
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>
    </MemberInfoStyle>
  );
}
