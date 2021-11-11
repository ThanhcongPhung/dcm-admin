import React, { useState } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControlLabel,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import AudioPlayer from '../../AudioASRManage/AudioTable/AudioPlayer';

export default function AudioRow({
  audioContent,
  setSelected,
  isItemSelected,
  selected,
}) {
  const [openASR, setOpenASR] = useState(false);
  const [isHover, setIsHover] = useState(true);

  const { t } = useTranslation();

  const handleCheckbox = () => {
    const audioId = audioContent.id;
    const selectedIndex = selected.indexOf(audioId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, audioId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  return (
    <>
      <TableRow
        onClick={() => setOpenASR(!openASR)}
        className={isHover && 'bodyRow'}
      >
        <TableCell padding="checkbox" align="center">
          <FormControlLabel
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsHover(false)}
            onMouseLeave={() => setIsHover(true)}
            className="formControlLabel"
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                checked={isItemSelected}
                onChange={handleCheckbox}
                color="primary"
              />
            }
          />
        </TableCell>
        <TableCell align="center" className="bodyCell">
          <Typography className="audioContent">
            {audioContent.transcript.botTranscript.script !== ''
              ? audioContent.transcript.botTranscript.script
              : audioContent.transcript.originTranscript.script}
          </Typography>
        </TableCell>
        <TableCell align="center" className="bodyCell">
          {(Math.round(audioContent.duration * 100) / 100).toFixed(2)}
        </TableCell>
        <TableCell align="center" className="bodyCell">
          {audioContent.speakerName}
        </TableCell>
        <TableCell align="center" className="bodyCell">
          {audioContent.audioStyle}
        </TableCell>
        <TableCell align="center" className="bodyCell">
          {audioContent.recordDevice}
        </TableCell>
        <TableCell align="center" className="bodyCell">
          {Moment(audioContent.createdAt).format('DD/MM/YYYY, HH:mm')}
        </TableCell>
        <TableCell align="center" className="bodyCell">
          <AudioPlayer
            audioLink={audioContent.audioLink}
            onMouseEnter={() => setIsHover(false)}
            onMouseLeave={() => setIsHover(true)}
          />
          <Tooltip title={t('edit')}>
            <IconButton
              className="editButton"
              onMouseEnter={() => setIsHover(false)}
              onMouseLeave={() => setIsHover(true)}
            >
              <Edit color="primary" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="tableCellCollapse" colSpan={8}>
          <Collapse in={openASR} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{t('scriptOrigin')}</TableCell>
                    <TableCell align="center">{t('scriptAutoGen')}</TableCell>
                    <TableCell align="center">{t('scriptEdited')}</TableCell>
                    <TableCell align="center">{t('scriptFinal')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" className="tableCell">
                      {audioContent.transcript.originTranscript.script}
                    </TableCell>
                    <TableCell align="center" className="tableCell">
                      {audioContent.transcript.botTranscript.script}
                    </TableCell>
                    <TableCell align="center" className="tableCell">
                      {audioContent.transcript.finalTranscript}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
