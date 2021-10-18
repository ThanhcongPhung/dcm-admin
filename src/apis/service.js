import api from './api';

export async function getServices({ search, fields, offset, limit, sort }) {
  try {
    const response = await api({
      method: 'GET',
      url: '/services',
      params: { search, fields, offset, limit, sort },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getService(serviceId) {
  try {
    const response = await api({
      method: 'GET',
      url: `/services/${serviceId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createService({
  name,
  campaignTypes,
  inputs,
  actions,
  url,
}) {
  try {
    const response = await api({
      method: 'POST',
      url: '/services',
      data: { name, campaignTypes, inputs, actions, url },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function editService({
  id,
  name,
  campaignTypes,
  inputs,
  actions,
  url,
}) {
  try {
    const response = await api({
      method: 'PUT',
      url: `/services/${id}`,
      data: { name, campaignTypes, inputs, actions, url },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteService(serviceId) {
  try {
    const response = await api({
      method: 'DELETE',
      url: `/services/${serviceId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getServiceManagers(serviceId) {
  try {
    const response = await api({
      method: 'GET',
      url: `/managers`,
      headers: { 'service-id': serviceId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function addServiceManager(serviceId, userId) {
  try {
    const response = await api({
      method: 'POST',
      url: `/managers/${userId}`,
      headers: { 'service-id': serviceId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteServiceManager(serviceId, userId) {
  try {
    const response = await api({
      method: 'DELETE',
      url: `/managers/${userId}`,
      headers: { 'service-id': serviceId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
