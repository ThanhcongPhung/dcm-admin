import api from './api';
import { FAQ_URL } from '../configs';

const baseURL = `${FAQ_URL}/api/faq/v1/categories`;

export async function getCategories({ search, fields, offset, limit, sort }) {
  const response = await api({
    method: 'GET',
    url: baseURL,
    params: { search, fields, offset, limit, sort },
  });
  return response;
}

export async function deleteCategory(id) {
  const response = await api({
    method: 'DELETE',
    url: `${baseURL}/${id}`,
  });
  return response;
}
