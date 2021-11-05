/* eslint-disable consistent-return */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  TableContainer,
  Paper,
} from '@material-ui/core';
import { TableStyled } from './index.style';

const tableTitle = [
  'no',
  'domainNLU',
  'campaign',
  'client',
  'agent',
  'mainIntent',
  'otherIntents',
];

export default function ConversationTable(props) {
  const { t } = useTranslation();
  const { conversationList, isLoading, pagination, campaigns = [] } = props;

  const getCampaignName = (campaignId) => {
    const campaignFind = campaigns.find(
      (campaign) => campaign.id === campaignId,
    );
    if (campaignFind) return campaignFind.name;
    return '';
  };

  const getMainIntentInfor = (mainIntent) => {
    if (!mainIntent) return;
    return (
      <>
        <Typography className="intentText">
          {t('intent')}: {mainIntent.intent.name}
        </Typography>
        {mainIntent.slots.map((el) => (
          <Typography variant="body2" key={el}>
            ○ {el.slot.name}: {el.value || ' '}
          </Typography>
        ))}
      </>
    );
  };

  return (
    <TableStyled>
      <TableContainer component={Paper}>
        <Table className="table">
          <TableHead>
            <TableRow>
              {tableTitle.map((item) => (
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
            {conversationList &&
              conversationList.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    className={`bodyRow ${!item.status && 'bodyRowFalse'}`}
                  >
                    <TableCell align="center" className="bodyCell">
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </TableCell>
                    <TableCell align="left" className="bodyCell ">
                      {item.domain.name}
                    </TableCell>
                    <TableCell align="left" className="bodyCell">
                      {getCampaignName(item.campaign)}
                    </TableCell>
                    <TableCell align="left" className="bodyCell">
                      {item.agent}
                    </TableCell>
                    <TableCell align="left" className="bodyCell">
                      {item.client}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="bodyCell mainIntentBodyCell"
                    >
                      {getMainIntentInfor(item.mainIntent)}
                    </TableCell>
                    <TableCell align="center" className="bodyCell">
                      {item.otherIntents.length}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            {isLoading && (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableStyled>
  );
}
