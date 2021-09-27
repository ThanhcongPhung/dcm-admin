import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AudioTable from './AudioTable';
import GroupButton from './AudioTable/GroupButton';
import PopupForm from './PopupForm/index';
import ImportAudio from './PopupForm/ImportAudio';
import api from '../../apis';
import { AudioASRManageStyle } from './index.style';

function AudioASRManage() {
  const [audioList, setAudioList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFormInput, setOpenFormInput] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const { t } = useTranslation();

  const fetchAudios = async (fields) => {
    setIsLoading(true);
    const { offset, search } = fields;
    const { data } = await api.audioASR.getAudioList({
      offset,
      search,
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
    fetchAudios({ offset: (value - 1) * pagination.limit });
  };

  useEffect(() => {
    fetchAudios({});
  }, []);

  return (
    <AudioASRManageStyle>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t('audioASRManage')}
          </Typography>
          <div className="headButtons">
            <GroupButton setOpenFormInput={setOpenFormInput} />
          </div>
        </div>
        <div className="audio-list">
          <AudioTable
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
      <PopupForm
        title={t('inputAudioForm')}
        openPopup={openFormInput}
        handleClose={() => setOpenFormInput(false)}
      >
        <ImportAudio />
      </PopupForm>
    </AudioASRManageStyle>
  );
}

export default AudioASRManage;
