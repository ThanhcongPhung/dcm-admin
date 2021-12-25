import api from './api';
import { ASR_URL } from '../configs';

export async function getValidRoomList({
  search,
  fields,
  offset,
  limit,
  sort,
}) {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/valid-rooms`,
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

export async function createValidRoom(validRoom) {
  try {
    const response = await api({
      method: 'POST',
      url: `${ASR_URL}/api/v1/valid-rooms`,
      data: validRoom,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
