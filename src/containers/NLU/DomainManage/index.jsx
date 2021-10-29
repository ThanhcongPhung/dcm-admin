import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  Paper,
  Typography,
  Button,
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import api from '../../../apis';
import DomainTable from './DomainTable';
import SearchInput from '../../../components/SearchInput';
import { PAGINATION } from '../../../constants';
import { DomainManageStyled } from './index.style';

export default function DomainManage() {
  const { t } = useTranslation();
  const history = useHistory();
  const [domainList, setDomainList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const [domainSearch, setDomainSearch] = useState({});

  const fetchCampaigns = async () => {
    const { data } = await api.campaign.getCampaigns({});
    if (data.status) {
      setCampaignList(data.result.campaigns);
    }
  };

  const fetchDomains = async (fields) => {
    setIsLoading(true);
    const { offset, search } = fields;
    const { data } = await api.nluDomain.getDomains({
      offset: offset || 0,
      search: search || '',
      limit: pagination.limit,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setDomainList(data.result.domains);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    }
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchDomains({
      offset: (value - 1) * pagination.limit,
      ...domainSearch,
    });
  };

  const onHandleSearchName = (searchValue) => {
    setDomainSearch((prev) => ({ ...prev, search: searchValue }));
    fetchDomains({ search: searchValue });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onHandleDelete = (deleteDomainId) => {
    const tempDomains = domainList.filter((item) => item.id !== deleteDomainId);
    if (tempDomains.length) {
      fetchDomains({
        offset: (pagination.page - 1) * pagination.limit,
        ...domainSearch,
      });
      setPagination((prev) => ({ ...prev, page: pagination.page }));
    } else {
      fetchDomains({
        offset:
          pagination.page > 1 ? (pagination.page - 2) * pagination.limit : 0,
        ...domainSearch,
      });
      setPagination((prev) => ({
        ...prev,
        page: pagination.page > 1 ? pagination.page - 1 : 1,
      }));
    }
  };

  const onHandleCreate = () => {
    history.push('/admin/nlu-manage/domains/create');
  };

  const onHandleEdit = (domainId) => {
    history.push(`/admin/nlu-manage/domains/${domainId}/edit`);
  };

  useEffect(() => {
    fetchDomains(domainSearch);
    // fetchCampaigns();
  }, []);

  if (!campaignList) return <CircularProgress />;

  return (
    <DomainManageStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t('domainManage')}
          </Typography>
        </div>
        <div className="header-action">
          <div className="domainSearch">
            <SearchInput
              onHandleSearch={onHandleSearchName}
              title="searchDomain"
              size="small"
            />
          </div>
          <div className="headButtons">
            <Tooltip title={t('addDomain')}>
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
        <div className="domainTable">
          <DomainTable
            domainList={domainList}
            campaignList={campaignList}
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
      </Paper>
    </DomainManageStyled>
  );
}
