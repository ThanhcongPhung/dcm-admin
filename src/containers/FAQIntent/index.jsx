import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, Paper, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import IntentTable from './IntentTable';
import { PAGINATION } from '../../constants';
import api from '../../apis';
import { ManageStyled } from './index.style';

export default function IntentManage() {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [intents, setIntents] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const { t } = useTranslation();

  const fetchIntents = async (fields) => {
    setIsLoading(true);
    const { offset, search } = fields;
    const { data } = await api.faqIntent.getIntents({
      offset: offset || 0,
      search: search || '',
      limit: pagination.limit,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setIntents(data.result.intents);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    } else {
      setIsLoading(false);
    }
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchIntents({ offset: (value - 1) * pagination.limit });
  };

  const handleCreate = () => history.push('/intents/create');

  const onHandleEdit = (intentId) =>
    history.push(`/admin/faq/intents/${intentId}/edit`);

  const onHandleDelete = async (deleteId) => {
    const tempCampaigns = intents.filter((item) => item.id !== deleteId);
    if (tempCampaigns.length) {
      fetchIntents({ offset: (pagination.page - 1) * pagination.limit });
      setPagination((prev) => ({ ...prev, page: pagination.page }));
    } else {
      fetchIntents({
        offset:
          pagination.page > 1 ? (pagination.page - 2) * pagination.limit : 0,
      });
      setPagination((prev) => ({
        ...prev,
        page: pagination.page > 1 ? pagination.page - 1 : 1,
      }));
    }
  };

  useEffect(() => {
    fetchIntents({});
  }, []);

  return (
    <ManageStyled>
      <Paper className="manage-container">
        <div className="header">
          <Typography variant="h4" className="headTitle">
            {t('intentManage')}
          </Typography>
          <div className="headButtons">
            <div className="add-btn">
              <IconButton onClick={handleCreate} className="iconButton">
                <AddIcon className="addIcon" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="intentTable">
          <IntentTable
            listIntents={intents}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onHandleDelete={onHandleDelete}
            onHandleEdit={onHandleEdit}
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
      </Paper>
    </ManageStyled>
  );
}
