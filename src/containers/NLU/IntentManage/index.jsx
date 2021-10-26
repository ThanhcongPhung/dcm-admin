import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Typography, Button, Tooltip } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import api from '../../../apis';
import IntentTable from './IntentTable';
import SearchInput from '../../../components/SearchInput';
import CreateIntentModal from './CreateIntentModal';
import { PAGINATION } from '../../../constants';
import { IntentManageStyled } from './index.style';

export default function IntentManage() {
  const [intentList, setIntentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const [intentSearch, setIntentSearch] = useState({});

  const { t } = useTranslation();

  const fetchIntents = async (fields) => {
    setIsLoading(true);
    const { offset, search } = fields;
    const { data } = await api.nluIntent.getIntents({
      offset: offset || 0,
      search: search || '',
      limit: pagination.limit,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setIntentList(data.result.intents);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    }
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchIntents({
      offset: (value - 1) * pagination.limit,
      ...intentSearch,
    });
  };

  const onHandleSearchName = (searchValue) => {
    setIntentSearch((prev) => ({ ...prev, search: searchValue }));
    fetchIntents({ search: searchValue });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onHandleDelete = (deleteIntentId) => {
    const tempIntents = intentList.filter((item) => item.id !== deleteIntentId);
    if (tempIntents.length) {
      fetchIntents({
        offset: (pagination.page - 1) * pagination.limit,
        ...intentSearch,
      });
      setPagination((prev) => ({ ...prev, page: pagination.page }));
    } else {
      fetchIntents({
        offset:
          pagination.page > 1 ? (pagination.page - 2) * pagination.limit : 0,
        ...intentSearch,
      });
      setPagination((prev) => ({
        ...prev,
        page: pagination.page > 1 ? pagination.page - 1 : 1,
      }));
    }
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const onHandleCreate = () => {
    handleOpenCreateModal();
    // history.push('/admin/nlu-manage/intents/create');
  };

  const onHandleEdit = () => {
    // TODO
  };

  useEffect(() => {
    fetchIntents(intentSearch);
  }, []);

  return (
    <IntentManageStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t('intentManage')}
          </Typography>
        </div>
        <div className="header-action">
          <div className="intentSearch">
            <SearchInput
              onHandleSearch={onHandleSearchName}
              title="searchIntent"
              size="small"
            />
          </div>
          <div className="headButtons">
            <Tooltip title={t('addIntent')}>
              <Button
                variant="contained"
                color="primary"
                className="addBtn"
                startIcon={<AddIcon />}
                onClick={onHandleCreate}
              >
                {t('add')}
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="intentTable">
          <IntentTable
            intentList={intentList}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onHandleEdit={onHandleEdit}
            onHandleDelete={onHandleDelete}
            pagination={pagination}
          />
        </div>
        <div className="pagination">
          <Pagination
            page={pagination.page}
            count={pagination.totalPages}
            onChange={handleChangePagination}
          />
        </div>
        <CreateIntentModal
          open={openCreateModal}
          handleClose={handleCloseCreateModal}
        />
      </Paper>
    </IntentManageStyled>
  );
}
