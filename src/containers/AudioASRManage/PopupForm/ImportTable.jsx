import React, { useState } from 'react';
import {
  ArrowBack,
  CloudDownload,
  CloudUpload,
  Delete,
  Edit,
} from '@material-ui/icons';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import AudioPlayer from '../AudioTable/AudioPlayer';
import { MAX_ITEMS_SMALL } from '../../../constants';
import api from '../../../apis';

const tableTitle = ['duration', 'speakerName', 'speakerAccent', 'action'];

function ImportAudio({
  setStep,
  audioList,
  setAudioList,
  user,
  setAudioLength,
}) {
  const [page, setPage] = useState(0);
  const handleChangePage = (event, value) => setPage(value);
  const { enqueueSnackbar } = useSnackbar();
  const { userId } = user;
  const { t } = useTranslation();

  const onSubmit = async () => {
    const { data } = await api.audioASR.importAudio({ audioList, userId });
    if (data.status) {
      setAudioLength(data.result);
      setAudioList([]);
      setStep(2);
    } else {
      enqueueSnackbar(data.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell align="center" variant="head" className="headerCell">
              {t('no')}
            </TableCell>
            <TableCell
              align="center"
              variant="head"
              className="headerCellContent"
            >
              {t('content')}
            </TableCell>
            {tableTitle &&
              tableTitle.map((item) => (
                <TableCell
                  key={item}
                  align="center"
                  variant="head"
                  className="headerCell"
                >
                  {t(item)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {audioList &&
            audioList
              .slice(
                page * MAX_ITEMS_SMALL,
                page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
              )
              .map((audio, index) => (
                <TableRow key={uuidv4()} className="bodyRow">
                  <TableCell align="center" className="bodyCell">
                    {page * MAX_ITEMS_SMALL + index + 1}
                  </TableCell>
                  <TableCell align="left" className="bodyCell">
                    <Typography className="audioContent">
                      {audio.transcript}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {(Math.round(audio.duration * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {audio.speakerName}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    {audio.speakerAccent}
                  </TableCell>
                  <TableCell align="center" className="bodyCell">
                    <AudioPlayer audioLink={audio.audioLink} />
                    <Tooltip title={t('delete')}>
                      <IconButton className="editButton">
                        <Delete color="variant" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          {audioList.length > MAX_ITEMS_SMALL && (
            <TablePagination
              rowsPerPageOptions={[]}
              count={audioList.length}
              rowsPerPage={MAX_ITEMS_SMALL}
              page={page}
              onPageChange={handleChangePage}
            />
          )}
        </TableBody>
      </Table>
      <div className="group-button-step-2">
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          component="label"
          className="importButton"
          startIcon={<CloudUpload />}
          disabled={audioList.length === 0}
        >
          {t('submit')}
        </Button>
        <Button
          onClick={() => setStep(0)}
          className="backButton"
          variant="contained"
          startIcon={<ArrowBack />}
        >
          {t('back')}
        </Button>
      </div>
    </div>
  );
}

export default ImportAudio;
