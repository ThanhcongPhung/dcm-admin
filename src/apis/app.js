import api from './api';

export async function getApp(appId) {
  try {
    const response = await api({
      method: 'GET',
      url: `/apps/${appId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
