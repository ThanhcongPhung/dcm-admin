import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Divider } from '@material-ui/core';
import Header from './Header';
import Summary from './Summary';
import NoData from '../../components/NoData';
import api from '../../apis';

function Statistics() {
  const [statsData, setStatsData] = useState({});
  const [dates, setDates] = useState({
    startDate: moment()
      .startOf('day')
      .subtract(1, 'month')
      .format('YYYY-MM-DDT00:00:00'),
    endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
  });

  const { t } = useTranslation();

  const fetchOverview = async (fields) => {
    const { data } = await api.statistic.getOverview({
      dates: (fields && fields.dates) || dates,
    });
    if (data.status) {
      const overviewResult = data.result;
      setStatsData([
        { title: 'service', total: overviewResult.serviceNumber },
        { title: 'user', total: overviewResult.userNumber },
        { title: 'campaign', total: overviewResult.campaignNumber },
        { title: 'draftCampaign', total: overviewResult.draftCampaignNumber },
        {
          title: 'waitingCampaign',
          total: overviewResult.waitingCampaignNumber,
        },
        {
          title: 'runningCampaign',
          total: overviewResult.runningCampaignNumber,
        },
        { title: 'pauseCampaign', total: overviewResult.pauseCampaignNumber },
        { title: 'endCampaign', total: overviewResult.endCampaignNumber },
      ]);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <>
      <Header dates={dates} setDates={setDates} fetchOverview={fetchOverview} />
      <Divider />
      {Object.keys(statsData).length ? (
        <>
          <Summary statsData={statsData} />
        </>
      ) : (
        <NoData text={t('noData')} />
      )}
    </>
  );
}

export default Statistics;
