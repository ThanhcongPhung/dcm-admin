import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ConversationSearch from './ConversationSearch';
import ConversationTable from './ConversationTable';
import api from '../../../apis';
import { PAGINATION } from '../../../constants';
import { ServiceManageStyled } from './index.style';

export default function CampaignManage() {
  const [conversationList, setConversationList] = useState([]);
  const [domainList, setDomainList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const [conversationSearch, setConversationSearch] = useState({
    status: 'total',
    domainId: 'total',
    campaignId: 'total',
    clientId: 'total',
    agentId: 'total',
  });

  const { t } = useTranslation();

  const fetchDomains = async () => {
    const { data } = await api.domain.getDomains({});
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

  const fetchConversations = async (fields) => {
    setIsLoading(true);
    const { offset, search, status, domainId, campaignId, clientId, agentId } =
      fields;
    const { data } = await api.conversation.getConversations({
      offset: offset || 0,
      search: search || '',
      domainId: domainId && domainId !== 'total' ? domainId : '',
      campaignId: campaignId && campaignId !== 'total' ? campaignId : '',
      clientId: clientId && clientId !== 'total' ? clientId : '',
      agentId: agentId && agentId !== 'total' ? agentId : '',
      status: status && status !== 'total' ? status : '',
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
    fetchConversations();
    fetchDomains();
    fetchCampaigns();
    fetchUsers();
  }, []);

  return (
    <ServiceManageStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t('collectionStatistics')}
          </Typography>
        </div>
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
            users={userList}
            campaigns={campaignList}
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
