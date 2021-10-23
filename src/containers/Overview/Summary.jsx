import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { SummaryStyled } from './index.style';
import Card from '../../components/Card';

function Summary({ statsData }) {
  const { t } = useTranslation();

  return (
    <SummaryStyled>
      {statsData &&
        statsData.map((item, index) => (
          <Card key={item} flexDirection="column" margin="10">
            <div className={`addonBefore addonBefore_${index + 1}`} />
            <div className="info">
              <Typography variant="h5">{t(`${item.title}Overview`)}</Typography>
              <Typography variant="h4" className="number">
                {item.total.toLocaleString()}
              </Typography>
            </div>
          </Card>
        ))}
    </SummaryStyled>
  );
}

export default Summary;
