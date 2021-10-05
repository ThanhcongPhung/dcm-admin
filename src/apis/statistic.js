import api from './api';

export async function getOverview({ dates }) {
  try {
    const response = await api({
      method: 'POST',
      url: '/overviews',
      data: { dates },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
