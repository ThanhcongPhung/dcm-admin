import api from './api';
import { FAQ_URL } from '../configs';

const baseURL = `${FAQ_URL}/api/v1/staffs`;

export async function getStaffs(condition = {}) {
  const categories = await api({
    method: 'GET',
    url: baseURL,
    params: condition,
  });
  return categories;
}
