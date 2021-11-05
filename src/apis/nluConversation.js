import api from './api';
import { NLU_URL } from '../configs';

const baseURL = `${NLU_URL}/api/nlu/v1`;

export async function getConversations({
  search,
  fields,
  offset,
  limit,
  sort,
  status,
  domainId,
  campaignId,
  clientId,
  agentId,
}) {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/conversations`,
      params: {
        search,
        fields,
        offset,
        limit,
        sort,
        status,
        domainId,
        campaignId,
        clientId,
        agentId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getConversation(conversationId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/conversations/${conversationId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getConversationStatistics() {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/conversations/statistics`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
