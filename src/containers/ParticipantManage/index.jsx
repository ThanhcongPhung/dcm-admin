import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  IconButton,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TextField,
  MenuItem,
  Icon,
  Avatar,
  Typography,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { MAX_ITEMS_SMALL, CAMPAIGN_ROLE } from '../../constants';

import api from '../../apis';
import Card from '../../components/Card';
import AddParticipant from './AddParticipant';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import { ParticipantTableStyled } from './index.style';

const tableTitle = ['no', 'avatar', 'email', 'role', 'action'];

export default function ParticipantManage() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState();
  const [page, setPage] = useState(0);
  const [deleteUserId, setDeleteUserId] = useState();
  const [editRole, setEditRole] = useState();
  const [participants, setParticipants] = useState([]);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onSetParticipants = (value) => setParticipants(value);
  const handleChangePage = (value) => setPage(value);

  const fetchParticipantCampaign = async () => {
    const { data } = await api.campaign.getParticipants(campaignId);
    if (data.status) setParticipants(data.result);
  };

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign({ campaignId });
    if (data.status) setCampaign(data.result);
  };

  const handleDeleteEmail = async () => {
    const { data } = await api.campaign.deleteParticipant(
      deleteUserId,
      campaignId,
    );
    if (data.status) {
      const currParticipants = participants.filter(
        (item) => item.userId !== deleteUserId,
      );
      onSetParticipants(currParticipants);
      if (!currParticipants.slice(page * MAX_ITEMS_SMALL).length && page > 0)
        setPage(page - 1);
      enqueueSnackbar(t('deleteParticipantSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteParticipantError'), { variant: 'error' });
    }
    setDeleteUserId();
  };

  const handleEditChange = (e) =>
    setEditRole((prev) => ({ ...prev, role: e.target.value }));

  const handleSaveEdit = async () => {
    const { data } = await api.campaign.editRoleParticipant({
      campaignId,
      userId: editRole.userId,
      role: editRole.role,
    });
    if (data.status) {
      const newParticipants = participants.map((item) =>
        item.email === editRole.email ? { ...item, role: editRole.role } : item,
      );
      onSetParticipants(newParticipants);
      enqueueSnackbar(t('editParticipantSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('editParticipantError'), { variant: 'error' });
    }
    setEditRole(null);
  };

  const handleCancelEdit = () => setEditRole(null);

  const TitleParticipant = () => (
    <Typography variant="h5">
      {`${t('participantManage')} ${t('campaign')} `}
      {campaign && campaign.name ? campaign.name : ''}
    </Typography>
  );

  useEffect(() => {
    if (campaignId) {
      fetchParticipantCampaign({});
      fetchCampaign();
    }
  }, []);

  return (
    <Card flexDirection="column" padding="16px">
      <CardHeader title={<TitleParticipant />} />
      <CardContent>
        <AddParticipant
          participants={participants}
          onSetParticipants={onSetParticipants}
          campaignId={campaignId}
        />
        <ParticipantTableStyled>
          <Typography variant="body2" gutterBottom>
            {t('participantList')}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                {tableTitle.map((title) => (
                  <TableCell align="center" key={title} className="headerCell">
                    {t(title)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {participants &&
                participants
                  .slice(
                    page * MAX_ITEMS_SMALL,
                    page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
                  )
                  .map((participant, index) => {
                    if (editRole && editRole.index === index) {
                      return (
                        <TableRow key={participant.email}>
                          <TableCell align="center" className="bodyCell">
                            {page * MAX_ITEMS_SMALL + index + 1}
                          </TableCell>
                          <TableCell align="center" className="bodyCell">
                            <Avatar
                              classes={{ root: 'avatar' }}
                              src={editRole.avatar}
                            />
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            {editRole.email}
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              select
                              value={editRole.role}
                              onChange={handleEditChange}
                              fullWidth
                            >
                              {Object.keys(CAMPAIGN_ROLE).map((value) => (
                                <MenuItem key={value} value={value}>
                                  {t(value)}
                                </MenuItem>
                              ))}
                            </TextField>
                          </TableCell>
                          <TableCell align="center" className="bodyCell">
                            <Tooltip
                              title={t('edit')}
                              onClick={() =>
                                setEditRole({ ...participant, index })
                              }
                            >
                              <IconButton onClick={handleSaveEdit}>
                                <Icon className="doneIcon">done</Icon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('cancel')}>
                              <IconButton onClick={handleCancelEdit}>
                                <Icon color="primary">close</Icon>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return (
                      <TableRow key={participant.email}>
                        <TableCell align="center" className="bodyCell">
                          {page * MAX_ITEMS_SMALL + index + 1}
                        </TableCell>
                        <TableCell align="center" className="bodyCell">
                          <Avatar
                            classes={{ root: 'avatar' }}
                            src={participant.avatar}
                          />
                        </TableCell>
                        <TableCell align="left" className="bodyCell">
                          {participant.email}
                        </TableCell>
                        <TableCell align="center" className="bodyCell role">
                          {t(participant.role)}
                        </TableCell>
                        <TableCell align="center" className="bodyCell">
                          <Tooltip
                            title={t('edit')}
                            onClick={() =>
                              setEditRole({ ...participant, index })
                            }
                          >
                            <IconButton>
                              <Edit color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('delete')}>
                            <IconButton
                              onClick={() =>
                                setDeleteUserId(participant.userId)
                              }
                            >
                              <Delete color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {participants.length > MAX_ITEMS_SMALL && (
                <TablePagination
                  rowsPerPageOptions={[]}
                  count={participants.length}
                  rowsPerPage={MAX_ITEMS_SMALL}
                  page={page}
                  onChangePage={(event, newPage) => handleChangePage(newPage)}
                />
              )}
            </TableBody>
          </Table>
        </ParticipantTableStyled>
        <ConfirmDialog
          open={!!deleteUserId}
          title={t('confirm')}
          content={t('confirmDeleteParticipant')}
          handleClose={() => setDeleteUserId()}
          handleConfirm={handleDeleteEmail}
        />
      </CardContent>
    </Card>
  );
}
