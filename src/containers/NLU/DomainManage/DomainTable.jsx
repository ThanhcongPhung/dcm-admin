import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Tooltip,
  TableContainer,
  Paper,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../../apis';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { TableStyled } from './index.style';

const tableTitle = ['no', 'name', 'campaign', 'intent', 'action'];

export default function DomainTable(props) {
  const {
    domainList,
    campaignList,
    isLoading,
    setIsLoading,
    onHandleEdit,
    onHandleDelete,
    pagination,
  } = props;
  const [selectDomain, setSelectDomain] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickDelete = (domain) => {
    setIsDelete(true);
    setSelectDomain(domain);
  };

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setSelectDomain();
  };

  const handleDeleteDomain = async () => {
    setIsLoading(true);
    const selectDomainId = selectDomain && selectDomain.id;
    const { data } = await api.nluDomain.deleteDomain(selectDomainId);
    setIsLoading(false);
    if (data && data.status) {
      onHandleDelete(selectDomainId);
      enqueueSnackbar(t('deleteDomainSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteDomainError'), { variant: 'error' });
    }
    handleCloseConfirm();
  };

  const getCampaign = (campaignId) => {
    const campaignFind = campaignList.find(
      (campaign) => campaign.id === campaignId,
    );
    return campaignFind.name;
  };

  return (
    <TableStyled>
      <TableContainer component={Paper}>
        <Table className="table">
          <TableHead>
            <TableRow>
              {tableTitle &&
                tableTitle.map((item) => (
                  <TableCell
                    key={item}
                    align="center"
                    variant="head"
                    className="headerCell"
                  >
                    {t(item)}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          {!isLoading && domainList && domainList.length <= 0 && (
            <Typography
              variant="body2"
              component="h2"
              className="emptyDataText"
            >
              {t('emptyData')}
            </Typography>
          )}
          <TableBody>
            {!isLoading &&
              domainList &&
              domainList.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    onClick={() => onHandleEdit(item.id)}
                    className="bodyRow"
                  >
                    <TableCell align="center" className="bodyCell">
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </TableCell>
                    <TableCell align="left" className="bodyCell nameBodyCell">
                      {item.name}
                    </TableCell>
                    <TableCell align="left" className="bodyCell">
                      {getCampaign(item.campaign)}
                    </TableCell>
                    <TableCell align="center" className="bodyCell">
                      {item.intent.name}
                    </TableCell>
                    <TableCell align="center" className="bodyCell">
                      <Tooltip title={t('deleteDomain')}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickDelete(item);
                          }}
                          className="iconButton"
                        >
                          <DeleteIcon className="deleteIcon" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            {isLoading && <CircularProgress />}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={isDelete}
        title={t('confirm')}
        content={t('confirmDeleteDomain')}
        handleClose={handleCloseConfirm}
        handleConfirm={handleDeleteDomain}
      />
    </TableStyled>
  );
}
