import api from './api';
import { CDN_URL } from '../configs';

export async function uploadFile(formData) {
  try {
    const response = await api({
      method: 'POST',
      url: `${CDN_URL}/api/v1/uploads/file`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
