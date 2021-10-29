import api from './api';
import { NLU_URL } from '../configs';

const baseURL = `${NLU_URL}/api/base/v1`;

export async function getDomains({ search, fields, offset, limit, sort }) {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/domains`,
      params: { search, fields, offset, limit, sort },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getDomain(domainId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${baseURL}/domains/${domainId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createDomain(domain) {
  try {
    const response = await api({
      method: 'POST',
      url: `${baseURL}/domains`,
      data: domain,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateDomain(domainId, domain) {
  try {
    const response = await api({
      method: 'PUT',
      url: `${baseURL}/domains/${domainId}`,
      data: domain,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteDomain(domainId) {
  try {
    const response = await api({
      method: 'DELETE',
      url: `${baseURL}/domains/${domainId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
