import api from './api';
import { NLU_URL } from '../configs';

const baseURL = `${NLU_URL}/api/nlu/v1`;

export async function getIntents({ search, fields, offset, limit, sort }) {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/intents`,
      params: { search, fields, offset, limit, sort },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getIntent(intentId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/intents/${intentId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createIntent(intent) {
  try {
    const response = await api({
      method: 'POST',
      url: `${baseURL}/intents`,
      data: intent,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateIntent(intentId, intent) {
  try {
    const response = await api({
      method: 'PUT',
      url: `${baseURL}/intents/${intentId}`,
      data: intent,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteIntent(intentId) {
  try {
    const response = await api({
      method: 'DELETE',
      url: `${baseURL}/intents/${intentId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
