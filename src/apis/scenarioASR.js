import api from './api';
import { ASR_URL } from '../configs';

export async function createScenario({
  domain,
  name,
  roleUser1,
  roleUser2,
  slots,
}) {
  try {
    const response = await api({
      method: 'POST',
      url: `${ASR_URL}/api/v1/scenarios`,
      data: { domain, name, roleUser1, roleUser2, slots },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getScenarios() {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/scenarios`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
