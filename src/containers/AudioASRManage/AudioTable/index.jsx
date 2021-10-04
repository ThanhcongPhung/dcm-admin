import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Checkbox,
} from '@material-ui/core';
import AudioRow from './AudioRow';
import { TableAudioStyle } from './index.style';

const tableTitle = [
  'duration',
  'speakerName',
  'audioType',
  'audioResource',
  'createdAt',
  'action',
];

function AudioTable(props) {
  const { audioList, isLoading } = props;
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation();

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = audioList.map((audio) => audio.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <TableAudioStyle>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" className="headerCell" align="center">
            <Checkbox
              color="primary"
              onChange={handleSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          <TableCell
            align="center"
            variant="head"
            className="headerCellContent"
          >
            {t('content')}
          </TableCell>
          {tableTitle &&
            tableTitle.map((title) => (
              <TableCell
                key={title}
                align="center"
                variant="head"
                className="headerCell"
              >
                {t(title)}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {audioList &&
          audioList.map((audioContent) => {
            const isItemSelected = isSelected(audioContent.id);
            return (
              <AudioRow
                key={audioContent.id}
                audioContent={audioContent}
                setSelected={setSelected}
                isItemSelected={isItemSelected}
                selected={selected}
              />
            );
          })}
        {isLoading && (
          <TableRow>
            <TableCell>
              <CircularProgress />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableAudioStyle>
  );
}

export default AudioTable;
