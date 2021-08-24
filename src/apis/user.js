import api from './api';

export async function getUsers({ search, roleName }) {
  try {
    const response = await api({
      method: 'GET',
      url: '/users',
      params: { search, roleName },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
