import api from './apiASR';

export async function getAudioList({
                                     search,
                                     fields,
                                     offset,
                                     limit,
                                     sort,
                                   }) {
  try {
    const response = await api({
      method: 'GET',
      url: '/audios',
      params: {
        search,
        fields,
        offset,
        limit,
        sort,

      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
