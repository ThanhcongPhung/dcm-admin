import React, { useEffect, useState } from 'react';
import AudioASRManageStyle from './index.style';
import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@material-ui/core';
import AudioList from './AudioList';
import { PAGINATION } from '../../constants';
import api from '../../apis';
import Pagination from '@material-ui/lab/Pagination';

function AudioASRManage() {
  const { t } = useTranslation();
  const [audioList, setAudioList] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });
  const [audioSearch, setAudioSearch] = useState({
    name: '',
  });
  const fetchAudios = async (fields) => {
    setIsLoading(true);
    const { offset, search,} = fields;
    const { data } = await api.audioASR.getAudioList({
      offset: offset || 0,
      search: search || '',
      limit: pagination.limit,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setAudioList(data.result.audios);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    } else {
      setIsLoading(false);
    }
  };
  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchAudios({
      offset: (value - 1) * pagination.limit,
      ...audioSearch,
    });
  };
  useEffect(() => {
    fetchAudios(audioSearch);
  }, []);
  return (
    <AudioASRManageStyle>
      <Paper className='container'>
        <div className='header'>
          <Typography variant='h5' className='headTitle'>
            {t('audioASRManage')}
          </Typography>
        </div>
        <div className='audio-list'>
            <AudioList
              audioList={audioList}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              pagination={pagination}
            />
        </div>
        <div className="pagination">
          <Pagination
            page={pagination.page}
            count={pagination.totalPages}
            onChange={handleChangePagination}
          />
        </div>
      </Paper>
    </AudioASRManageStyle>
  );
}

export default AudioASRManage;
