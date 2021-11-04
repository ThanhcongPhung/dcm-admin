import React from 'react';
import { Edit } from '@material-ui/icons';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import AudioPlayer from '../AudioTable/AudioPlayer';

const tableTitle = [
  'no',
  'content',
  'duration',
  'speakerName',
  'speakerAccent',
  'action',
];
function ImportAudio({ audioList }) {
  const { t } = useTranslation();

  return (
    <Table className="table">
      <TableHead>
        <TableRow>
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
          audioList.map((audio, index) => (
            <TableRow key={uuidv4()} className="bodyRow">
              <TableCell align="center" className="bodyCell">
                {index + 1}
              </TableCell>
              <TableCell align="center" className="bodyCell">
                {audio.transcript}
              </TableCell>
              <TableCell align="center" className="bodyCell">
                {audio.duration}
              </TableCell>
              <TableCell align="center" className="bodyCell">
                {audio.speakerName}
              </TableCell>
              <TableCell align="center" className="bodyCell">
                {audio.speakerAccent}
              </TableCell>
              <TableCell align="center" className="bodyCell">
                <AudioPlayer audioLink={audio.audioLink} />
                <Tooltip title={t('edit')}>
                  <IconButton
                    className="editButton"
                    // onMouseEnter={() => setIsHover(false)}
                    // onMouseLeave={() => setIsHover(true)}
                  >
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default ImportAudio;
