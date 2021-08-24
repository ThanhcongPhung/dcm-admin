import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Paper, Typography, IconButton, Tooltip } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import api from '../../apis';
import CampaignTable from './CampaignTable';
import CampaignSearch from './CampaignSearch';
import { PAGINATION } from '../../constants';
import { ServiceManageStyled } from './index.style';

export default function CampaignManage() {
  const history = useHistory();
  const [services, setServices] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const [campaignSearch, setCampaignSearch] = useState({
    name: '',
    serviceId: 'total',
    campaignVisibility: 'total',
    status: 'total',
  });

  const { t } = useTranslation();

  const fetchCampaigns = async (fields) => {
    setIsLoading(true);
    const { offset, search, serviceId, campaignVisibility, status } = fields;
    const { data } = await api.campaign.getCampaigns({
      offset: offset || 0,
      search: search || '',
      serviceId: serviceId && serviceId !== 'total' ? serviceId : '',
      campaignVisibility:
        campaignVisibility && campaignVisibility !== 'total'
          ? campaignVisibility
          : '',
      status: status && status !== 'total' ? status : '',
      limit: pagination.limit,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setCampaignList(data.result.campaigns);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    } else {
      setIsLoading(false);
    }
  };

  const fetchServices = async () => {
    const { data } = await api.service.getServices({});
    if (data.status) setServices(data.result.services);
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchCampaigns({
      offset: (value - 1) * pagination.limit,
      ...campaignSearch,
    });
  };

  const onHandleChangeSearch = (e) => {
    setCampaignSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    fetchCampaigns({ ...campaignSearch, [e.target.name]: e.target.value });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onHandleSearchName = (searchValue) => {
    setCampaignSearch((prev) => ({ ...prev, search: searchValue }));
    fetchCampaigns({ search: searchValue });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onHandleDelete = (deleteCampaignId) => {
    const tempCampaigns = campaignList.filter(
      (item) => item.id !== deleteCampaignId,
    );
    if (tempCampaigns.length) {
      fetchCampaigns({
        offset: (pagination.page - 1) * pagination.limit,
        ...campaignSearch,
      });
      setPagination((prev) => ({ ...prev, page: pagination.page }));
    } else {
      fetchCampaigns({
        offset:
          pagination.page > 1 ? (pagination.page - 2) * pagination.limit : 0,
        ...campaignSearch,
      });
      setPagination((prev) => ({
        ...prev,
        page: pagination.page > 1 ? pagination.page - 1 : 1,
      }));
    }
  };

  const onHandleChangeStatus = () => {
    fetchCampaigns({
      offset: (pagination.page - 1) * pagination.limit,
      ...campaignSearch,
    });
  };

  const onHandleCreate = () => {
    history.push(`/campaigns/create?step=0`);
  };

  const onHandleEdit = (campaignId) => {
    history.push(`/campaigns/create?campaignId=${campaignId}&step=0`);
  };

  useEffect(() => {
    fetchCampaigns(campaignSearch);
    fetchServices();
  }, []);

  return (
    <ServiceManageStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t('campaignManage')}
          </Typography>
          <div className="headButtons">
            <Tooltip title={t('createCampaign')}>
              <IconButton onClick={onHandleCreate} className="iconButton">
                <AddIcon className="addIcon" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="campaignSearch">
          <CampaignSearch
            onHandleSearchName={onHandleSearchName}
            services={services}
            campaignSearch={campaignSearch}
            onHandleChangeSearch={onHandleChangeSearch}
          />
        </div>
        <div className="campaignTable">
          <CampaignTable
            campaignList={campaignList}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onHandleEdit={onHandleEdit}
            pagination={pagination}
            onHandleDelete={onHandleDelete}
            onHandleChangeStatus={onHandleChangeStatus}
            services={services}
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
    </ServiceManageStyled>
  );
}
