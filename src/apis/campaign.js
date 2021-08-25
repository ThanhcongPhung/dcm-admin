import api from './api';

export async function getCampaigns({
  search,
  fields,
  offset,
  limit,
  sort,
  serviceId,
  campaignVisibility,
  status,
}) {
  try {
    const response = await api({
      method: 'GET',
      url: '/campaigns',
      params: {
        search,
        fields,
        offset,
        limit,
        sort,
        serviceId,
        campaignVisibility,
        status,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteCampaign(campaignId) {
  try {
    const response = await api({
      method: 'DELETE',
      url: `/campaigns/${campaignId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createCampaign({
  name,
  description,
  campaignVisibility,
  image,
  startTime,
  endTime,
  serviceId,
  action,
  campaignType,
  appId,
  botId,
}) {
  try {
    const response = await api({
      method: 'POST',
      url: '/campaigns',
      data: {
        name,
        description,
        campaignVisibility,
        image,
        startTime,
        endTime,
        serviceId,
        action,
        campaignType,
        appId,
        botId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateCampaign({
  campaignId,
  name,
  description,
  campaignVisibility,
  image,
  startTime,
  endTime,
  appId,
  botId,
}) {
  try {
    const response = await api({
      method: 'PUT',
      url: `/campaigns/${campaignId}`,
      data: {
        name,
        description,
        campaignVisibility,
        image,
        startTime,
        endTime,
        appId,
        botId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getCampaign(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `/campaigns/${campaignId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
