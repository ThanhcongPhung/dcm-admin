import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ConversationSearch from './ConversationSearch';
import ConversationTable from './ConversationTable';
import StatisticsOverview from './StatisticsOverview';

import api from '../../../apis';
import { PAGINATION } from '../../../constants';
import { StatisticsStyled } from './index.style';

export default function Statistics() {
  const [conversationList, setConversationList] = useState([]);
  const [domainList, setDomainList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [statisticsData, setStatisticsData] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const [conversationSearch, setConversationSearch] = useState({});

  const { t } = useTranslation();

  const fetchDomains = async () => {
    const { data } = await api.nluDomain.getDomains({});
    if (data && data.status) {
      setDomainList(data.result.domains);
    }
  };

  const fetchCampaigns = async () => {
    const { data } = await api.campaign.getCampaigns({});
    if (data && data.status) {
      setCampaignList(data.result.campaigns);
    }
  };

  const fetchUsers = async () => {
    const { data } = await api.user.getUsers({});
    if (data && data.status) {
      setUserList(data.result.users);
    }
  };

  const fetchConversationStatistics = async () => {
    const { data } = await api.nluConversation.getConversationStatistics();
    if (data && data.status) {
      setStatisticsData(data.result);
    }
  };

  const fetchConversations = async (fields) => {
    setIsLoading(true);
    const { offset, search, status, domainId, campaignId, clientId, agentId } =
      fields;
    const { data } = await api.nluConversation.getConversations({
      offset: offset || 0,
      search: search || '',
      domainId: domainId || '',
      campaignId: campaignId || '',
      clientId: clientId || '',
      agentId: agentId || '',
      status: status || '',
      limit: pagination.limit,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setConversationList(data.result.conversations);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    }
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchConversations({
      offset: (value - 1) * pagination.limit,
      ...conversationSearch,
    });
  };

  const handleChangeSearch = (name, value) => {
    setConversationSearch((prev) => ({ ...prev, [name]: value }));
    fetchConversations({ ...conversationSearch, [name]: value });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  useEffect(() => {
    fetchConversations({});
    fetchConversationStatistics();
    fetchDomains();
    fetchCampaigns();
    fetchUsers();
  }, []);

  if (!domainList || !campaignList || !userList) return <CircularProgress />;
  return (
    <StatisticsStyled>
      <div className="header">
        <Typography variant="h5" className="headTitle">
          {t('collectionStatistics')}
        </Typography>
      </div>
      <div className="statisticsOverview">
        <StatisticsOverview statisticsData={statisticsData} />
      </div>
      <Paper className="container">
        <div className="conversationSearch">
          <ConversationSearch
            domains={domainList}
            campaigns={campaignList}
            users={userList}
            handleChangeSearch={handleChangeSearch}
            dataSearch={conversationSearch}
          />
        </div>
        <div className="conversationTable">
          <ConversationTable
            conversationList={conversationList}
            isLoading={isLoading}
            pagination={pagination}
            campaigns={campaignList}
          />
        </div>
        <div className="pagination">
          <Typography variant="body2">* {t('redRowNote')}</Typography>
          <Pagination
            page={pagination.page}
            count={pagination.totalPages}
            onChange={handleChangePagination}
          />
        </div>
      </Paper>
    </StatisticsStyled>
  );
}
