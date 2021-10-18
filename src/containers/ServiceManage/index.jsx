import React, { useState, useEffect } from 'react';
import { Paper, Typography, IconButton } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import api from '../../apis';
import ServiceTable from './ServiceTable';
import ServiceInfo from './ServiceInfo';
import SearchInput from '../../components/SearchInput';
import { PAGINATION } from '../../constants';
import { ServiceManageStyled } from './index.style';
import ServiceManager from './ServiceManager';

function ServerManage() {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [serviceEdit, setServiceEdit] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const fetchGetServices = async (serviceFields) => {
    const { data } = await api.service.getServices({
      offset: (serviceFields && serviceFields.offset) || 0,
      search: (serviceFields && serviceFields.search) || '',
      limit: pagination.limit,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setServiceList(data.result.services);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    } else {
      setIsLoading(false);
    }
  };

  const onCancelShowService = () => {
    setIsCreate(false);
    setServiceEdit(null);
  };

  const onHandleSearch = (searchValue) => {
    fetchGetServices({ search: searchValue });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onHandleDelete = (serviceDelete) => {
    const tempServices = serviceList.filter(
      (item) => item.id !== serviceDelete,
    );
    if (tempServices.length) {
      fetchGetServices({ offset: (pagination.page - 1) * pagination.limit });
      setPagination((prev) => ({ ...prev, page: pagination.page }));
    } else {
      fetchGetServices({ offset: (pagination.page - 2) * pagination.limit });
      setPagination((prev) => ({ ...prev, page: pagination.page - 1 }));
    }
  };

  const onHandleEdit = (serviceItem) => {
    const tempServices = serviceList;
    const index = serviceList.findIndex((item) => item.id === serviceItem.id);
    if (index >= 0) {
      tempServices[index] = serviceItem;
      setServiceList(tempServices);
      onCancelShowService();
    }
  };

  const onHandleAdd = () => {
    fetchGetServices();
    onCancelShowService();
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchGetServices({ offset: (value - 1) * pagination.limit });
  };

  const handleClickServiceEdit = (service) => {
    setIsCreate(true);
    setServiceEdit(service);
  };

  const handleShowManager = (serviceId) => setSelectedId(serviceId);

  useEffect(() => {
    setIsLoading(true);
    fetchGetServices();
  }, []);

  return (
    <div>
      <ServiceManageStyled>
        <Paper className="container">
          <div className="header">
            <Typography variant="h5" className="headTitle">
              {t('serviceManage')}
            </Typography>
            <div className="headButtons">
              <SearchInput
                onHandleSearch={onHandleSearch}
                title="searchService"
              />
              <div className="addService">
                <IconButton
                  onClick={() => setIsCreate(true)}
                  className="iconButton"
                >
                  <AddIcon className="addIcon" />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="serviceTable">
            <ServiceTable
              serviceList={serviceList}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleClickServiceEdit={handleClickServiceEdit}
              pagination={pagination}
              onHandleDelete={onHandleDelete}
              handleShowManager={handleShowManager}
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
      <ServiceInfo
        open={isCreate}
        handleClose={onCancelShowService}
        setIsLoading={setIsLoading}
        serviceEdit={serviceEdit}
        onHandleEdit={onHandleEdit}
        onHandleAdd={onHandleAdd}
      />
      <ServiceManager
        open={!!selectedId}
        handleClose={() => setSelectedId(null)}
        serviceId={selectedId}
      />
    </div>
  );
}

export default ServerManage;
