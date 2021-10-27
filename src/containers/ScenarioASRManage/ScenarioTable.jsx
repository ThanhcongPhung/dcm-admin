import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { TableStyled } from './index.style';

const tableTitle = [
  'no',
  'name',
  'domain',
  'roleUser1',
  'roleUser2',
  'slotNumber',
  'action',
];

export default function ScenarioTable() {
  const { t } = useTranslation();

  return (
    <TableStyled>
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
          <TableRow className="bodyRow">
            <TableCell align="center" className="bodyCell" />
            <TableCell align="left" className="bodyCell nameBodyCell" />
            <TableCell align="center" className="bodyCell time" />
            <TableCell align="center" className="bodyCell" />
            <TableCell align="center" className="bodyCell" />
            <TableCell align="center" />
            <TableCell align="center" className="bodyCell">
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
              >
                <MoreVert />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableStyled>
  );
}
