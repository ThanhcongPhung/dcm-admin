import React, { useState, useEffect } from 'react';
import { Paper, Typography, IconButton } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import api from '../../apis';
import ServiceTable from './ServiceTable';
import ServiceInfo from './ServiceInfo';
import SearchInput from '../../components/Input/SearchInput';
import { ServiceManageStyled } from './index.style';

function ServerManage() {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [search, setSearch] = useState('');
  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [serviceEdit, setServiceEdit] = useState(null);

  const fetchGetServices = async (serviceFields) => {
    const { data } = await api.service.getServices({
      offset: (serviceFields && serviceFields.offset) || 0,
      search: (serviceFields && serviceFields.search) || search,
      limit: pagination.limit,
      fields: '',
      sort: '',
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

  const onHandleSearch = (searchValue) => {
    fetchGetServices({ search: searchValue });
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchGetServices();
  }, []);

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({
      ...prev,
      page: value,
    }));
    fetchGetServices({
      offset: (value - 1) * pagination.limit,
    });
  };

  const handleClickServiceEdit = (service) => {
    setIsCreate(true);
    setServiceEdit(service);
  };

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
                search={search}
                setSearch={setSearch}
                onHandleSearch={onHandleSearch}
              />
              <div>
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
              fetchGetServices={fetchGetServices}
              setIsLoading={setIsLoading}
              handleClickServiceEdit={handleClickServiceEdit}
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
      {isCreate && (
        <ServiceInfo
          open={isCreate}
          handleClose={() => {
            setIsCreate(false);
            setServiceEdit(null);
          }}
          setIsLoading={setIsLoading}
          fetchGetServices={fetchGetServices}
          serviceEdit={serviceEdit}
        />
      )}
    </div>
  );
}

export default ServerManage;
