import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StatisticsOverviewStyled, StatisticsCardStyled } from './index.style';

const StatisticsCard = ({ label, value = 0, borderColor }) => {
  const { t } = useTranslation();
  return (
    <StatisticsCardStyled borderColor={borderColor}>
      <Box>
        <Typography variant="body1" className="labelText">
          {t(label)}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Typography variant="h4" className="valueText">
          {value}
        </Typography>
      </Box>
    </StatisticsCardStyled>
  );
};

const statisticsDataTitle = [
  {
    label: 'totalConversation',
    varName: 'total',
    borderColor: '#015668',
  },
  {
    label: 'totalConversationSuccess',
    varName: 'totalSuccess',
    borderColor: '#59B582',
  },
  {
    label: 'totalConversationFailed',
    varName: 'totalFailed',
    borderColor: '#EE8585',
  },
  {
    label: 'domainNLU',
    varName: 'domain',
    borderColor: '#090F87',
  },
  {
    label: 'campaign',
    varName: 'campaign',
    borderColor: '#B991D9',
  },
  {
    label: 'user',
    varName: 'user',
    borderColor: '#F0944D',
  },
];

export default function StatisticsOverview({ statisticsData }) {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    if (statisticsData) {
      const tempStatistics = statisticsDataTitle.map((el) => ({
        ...el,
        value: statisticsData[el.varName],
      }));
      setStatistics([...tempStatistics]);
    }
  }, [statisticsData]);

  if (!statisticsData) return <CircularProgress />;

  return (
    <StatisticsOverviewStyled>
      <Grid container spacing={2}>
        {statistics.map((el) => (
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <StatisticsCard {...el} />
          </Grid>
        ))}
      </Grid>
    </StatisticsOverviewStyled>
  );
}
