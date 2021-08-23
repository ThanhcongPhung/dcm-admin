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
