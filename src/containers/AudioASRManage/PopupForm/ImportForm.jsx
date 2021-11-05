import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CloudUpload, CloudDownload } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import api from '../../../apis';

function createData(name, detail, description) {
  return { name, detail, description };
}

const rows = [
  createData('Path', 'Đường dẫn đến folder chứa audio', ''),
  createData(
    'Transcript',
    'Nội dung của tệp âm thanh',
    '16000 sample rate - mono - wav',
  ),
  createData('Audio Name', 'Tên audio', ''),
  createData('Speaker ID', 'Mã định danh người nói', ''),
  createData('Speaker Name', 'Tên người nói'),
  createData('Speaker Accent', 'Giọng vùng miền của người nói'),
  createData('Speaker Gender', 'Giới tính người nói'),
  createData('Speaker Age', 'Tuổi người nói'),
  createData('Audio Duration', 'Thời lượng của audio'),
  createData(
    'Audio Content',
    'Có 3 loại(multi-domain, indomain(bank, fintech)',
  ),
  createData('Audio Style', 'Kiểu tệp âm thanh(conversation, read)'),
  createData('Audio Type', 'Loại tệp âm thanh(news, talkshow, switchboard)'),
  createData('Record Device', 'Thu âm trong môi trường nào'),
];

function ImportForm({ setStep, setAudioList }) {
  const [importType, setImportType] = useState('');
  const [fileAudio, setFileAudio] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleChangeDropdown = (event) => setImportType(event.target.value);

  const onChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFileAudio(files);
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('files', fileAudio[0], fileAudio[0].name);
    const { data } = await api.audioASR.validateFile(formData);
    if (data.status) {
      setAudioList(data.result);
      setStep(1);
    } else {
      enqueueSnackbar(data.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <div className="title-form">
        <div>
          <p>{t('upload')}</p>
        </div>
        <hr className="hr" />
      </div>
      <div className="text-form-1">
        <div className="select-type">
          <Box className="importMode">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t('importingMode')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={importType}
                label="External Resource"
                onChange={handleChangeDropdown}
              >
                <MenuItem value={1}>{t('dataCollectionTool')}</MenuItem>
                <MenuItem value={2}>{t('externalResource')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="upload-form">
          <input
            accept=".csv"
            type="file"
            className="inputFile"
            onChange={onChange}
          />
          <div className="group-button">
            <Button
              onClick={() => onSubmit()}
              variant="contained"
              component="label"
              className="importButton"
              startIcon={<CloudUpload />}
              disabled={!fileAudio}
            >
              {t('upload')}
            </Button>
            <Button
              className="importButton"
              variant="contained"
              startIcon={<CloudDownload />}
            >
              {t('csv')}
            </Button>
          </div>
        </div>
      </div>
      <div className="title-form">
        <div>
          <p>{t('fileFormat')}</p>
        </div>
        <hr className="hr" />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('column')}</TableCell>
              <TableCell align="center">{t('detail')}</TableCell>
              <TableCell align="center">{t('note')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.detail}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ImportForm;
