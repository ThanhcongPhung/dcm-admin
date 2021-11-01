import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import { TableStyled } from './index.style';

const tableTitle = ['no', 'status', 'domain', 'campaign', 'client', 'agent'];

export default function ConversationTable(props) {
  const { t } = useTranslation();
  const {
    conversationList,
    isLoading,
    pagination,
    users = [],
    campaigns = [],
  } = props;

  const getUserName = (userId) => {
    const userFind = users.find((user) => user.id === userId);
    if (userFind) return userFind.name;
    return '';
  };

  const getCampaignName = (campaignId) => {
    const campaignFind = campaigns.find(
      (campaign) => campaign.id === campaignId,
    );
    if (campaignFind) return campaignFind.name;
    return '';
  };

  return (
    <TableStyled>
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
                <TableRow className="bodyRow">
                  <TableCell align="center" className="bodyCell">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </TableCell>
                  <TableCell align="left" className="bodyCell nameBodyCell">
                    {item.domain.name}
                  </TableCell>
                  <TableCell align="left" className="bodyCell nameBodyCell">
                    {getCampaignName(item.campaign)}
                  </TableCell>
                  <TableCell align="left" className="bodyCell nameBodyCell">
                    {getUserName(item.agent)}
                  </TableCell>
                  <TableCell align="left" className="bodyCell nameBodyCell">
                    {getUserName(item.client)}
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
    </TableStyled>
  );
}
