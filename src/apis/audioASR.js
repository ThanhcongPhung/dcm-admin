import api from './api';
import { VALID_URL, ASR_URL } from '../configs';

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
export async function getAudioValidList({
  search,
  fields,
  offset,
  limit,
  sort,
}) {
  try {
    const response = await api({
      method: 'GET',
      url: `${VALID_URL}/api/v1/audios`,
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
export async function validateFile(formData) {
  try {
    const response = await api({
      method: 'POST',
      url: `${VALID_URL}/api/v1/files/validate`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function importAudio({ audioList, userId }) {
  try {
    const response = await api({
      method: 'POST',
      url: `${VALID_URL}/api/v1/files/import`,
      data: { audioList, userId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
