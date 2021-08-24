import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import { useSnackbar } from 'notistack';
import {
  Button,
  Grid,
  TextField,
  Avatar,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { SYSTEM_ROLE, CAMPAIGN_ROLE } from '../../constants';
import api from '../../apis';
import { AddParticipantStyled } from './index.style';

export default function AddParticipant({
  participants,
  onSetParticipants,
  campaignId,
}) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const currentParticipants = useRef(participants);
  const [selectedRole, setSelectedRole] = useState(CAMPAIGN_ROLE.CONTRIBUTOR);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddUser = async () => {
    if (!selectedAccount || !selectedRole) return;
    const { data } = await api.campaign.addParticipant({
      userId: selectedAccount.id,
      role: selectedRole,
      campaignId,
    });
    if (data.status) {
      const newParticipant = {
        userId: selectedAccount.id,
        email: selectedAccount.email,
        avatar: selectedAccount.avatar,
        role: selectedRole,
      };
      onSetParticipants([...participants, newParticipant]);
      enqueueSnackbar(t('addParticipantSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('addParticipantError'), { variant: 'error' });
    }
    setSelectedAccount(null);
    setSelectedRole(CAMPAIGN_ROLE.CONTRIBUTOR);
  };

  const delaySearch = useRef(
    debounce(async (searchValue) => {
      if (searchValue.trim() !== '') {
        const { data } = await api.user.getUsers({
          search: searchValue,
          roleName: SYSTEM_ROLE.USER,
        });
        if (data.status) {
          const chooseParticipants = data.result.users.filter((user) =>
            currentParticipants.current.every(
              (item) => item.userId !== user.id,
            ),
          );
          setAccounts(chooseParticipants);
        }
      } else {
        setAccounts([]);
      }
    }, 800),
  ).current;

  useEffect(() => {
    if (inputValue === '')
      setAccounts(selectedAccount ? [selectedAccount] : []);
    delaySearch(inputValue);
  }, [selectedAccount, inputValue]);

  useEffect(() => {
    currentParticipants.current = participants;
  }, [participants]);

  return (
    <AddParticipantStyled container spacing={3} alignItems="center">
      <Grid item sx={12} sm={6}>
        <Autocomplete
          getOptionLabel={(option) => option.email}
          options={accounts}
          autoComplete
          autoHighlight
          includeInputInList
          filterSelectedOptions
          noOptionsText={t('noOptions')}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t('enterEmail')}
              variant="outlined"
            />
          )}
          renderOption={(option) => (
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Avatar src={option.avatar} />
              </Grid>
              <Grid item xs>
                <Typography>{option.name}</Typography>
                <Typography variant="body2">{option.email}</Typography>
              </Grid>
            </Grid>
          )}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          value={selectedAccount}
          onChange={(event, newValue) => {
            if (newValue) {
              setAccounts([newValue, ...accounts]);
              setSelectedAccount(newValue);
            }
          }}
        />
      </Grid>
      <Grid item sx={6} sm={4}>
        <TextField
          select
          fullWidth
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          variant="outlined"
        >
          {Object.keys(CAMPAIGN_ROLE).map((value) => (
            <MenuItem value={value}>{t(value)}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item sx={6} sm={2}>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleAddUser}
          disabled={!selectedAccount}
        >
          {t('add')}
        </Button>
      </Grid>
    </AddParticipantStyled>
  );
}
