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

export async function updateServiceCampaign(campaignId, detailCampaign) {
  try {
    const response = await api({
      method: 'PUT',
      url: `/campaigns/service`,
      data: detailCampaign,
      headers: { 'campaign-id': campaignId },
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

export async function getIntents(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `/campaigns/intents`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateStatusCampaign(campaignId, status) {
  try {
    const response = await api({
      method: 'PUT',
      url: `/campaigns/status`,
      headers: { 'campaign-id': campaignId },
      data: { status },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getParticipants(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `/campaigns/participants`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function addParticipant({ userId, role, campaignId }) {
  try {
    const response = await api({
      method: 'POST',
      url: `/participants`,
      headers: { 'campaign-id': campaignId },
      data: { participantId: userId, role },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteParticipant(userId, campaignId) {
  try {
    const response = await api({
      method: 'DELETE',
      url: `/participants/${userId}`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function editRoleParticipant({ campaignId, userId, role }) {
  try {
    const response = await api({
      method: 'PUT',
      url: `/participants/${userId}`,
      headers: { 'campaign-id': campaignId },
      data: { role },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
