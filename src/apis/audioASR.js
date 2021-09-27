import api from './api';
import { ASR_URL } from '../configs';

export async function getAudioList({ search, fields, offset, limit, sort }) {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/audios`,
      params: {
        search,
        fields,
        offset,
        limit,
        sort,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
