import api from './api';
import { CHATBOT_URL } from '../configs';

export async function getUserSays({
  search,
  campaignId,
  sort,
  status,
  intentNames,
  range,
  type,
  senderId,
}) {
  try {
    const response = await api({
      method: 'POST',
      url: `${CHATBOT_URL}/api/chatbot/v1/usersays`,
      headers: { 'campaign-id': campaignId },
      data: { search, status, intentNames, range, sort, type, senderId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getIntents(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_URL}/api/chatbot/v1/intents`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
