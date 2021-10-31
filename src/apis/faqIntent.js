import api from './api';
import { FAQ_URL } from '../configs';

const baseURL = `${FAQ_URL}/api/faq/v1/intents`;

export async function getIntents({
  type,
  search,
  fields,
  offset,
  limit,
  sort,
}) {
  try {
    const response = await api({
      method: 'GET',
      url: baseURL,
      params: { type, search, fields, offset, limit, sort },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getIntentsByCategory() {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/category`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
