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

export async function createCategory(data) {
  const response = await api({
    method: 'POST',
    url: baseURL,
    data,
  });
  return response;
}

export async function updateCategory(id, data) {
  const response = await api({
    method: 'PUT',
    url: `${baseURL}/${id}`,
    data,
  });
  return response;
}

export async function getCategory(id) {
  const category = await api({
    method: 'GET',
    url: `${baseURL}/${id}`,
  });
  return category;
}
