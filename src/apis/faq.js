import api from './api';
import { FAQ_URL } from '../configs';

export async function getIntents() {
  try {
    const response = await api({
      method: 'GET',
      url: `${FAQ_URL}/api/v1/intents-by-category`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
