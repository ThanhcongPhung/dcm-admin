import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import { Typography, Button } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import { HeaderStyled } from './index.style';

function HeaderController({ dates, setDates, fetchOverview }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const [dateButton, setDateButton] = useState('month');

  const { t } = useTranslation();

  const handleFocusChange = (focusedValue) => setFocusedInput(focusedValue);

  const handleDatesChange = ({ startDate, endDate }) => {
    const datesField = {
      startDate: moment(startDate).format('YYYY-MM-DDT00:00:00'),
      endDate: moment(endDate).format('YYYY-MM-DDT23:59:59'),
    };
    fetchOverview({ dates: datesField });
    setDates(datesField);
    setDateButton('');
  };

  const handleClickToday = () => {
    setDateButton('today');
    const datesField = {
      startDate: moment().startOf('day').format('YYYY-MM-DDT00:00:00'),
      endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    };
    fetchOverview({ dates: datesField });
    setDates(datesField);
  };

  const handleClickWeek = () => {
    setDateButton('week');
    const datesField = {
      startDate: moment()
        .startOf('day')
        .subtract(1, 'week')
        .format('YYYY-MM-DDT00:00:00'),
      endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    };
    fetchOverview({ dates: datesField });
    setDates(datesField);
  };

  const handleClickMonth = () => {
    setDateButton('month');
    const datesField = {
      startDate: moment()
        .startOf('day')
        .subtract(1, 'month')
        .format('YYYY-MM-DDT00:00:00'),
      endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    };
    fetchOverview({ dates: datesField });
    setDates(datesField);
  };

  return (
    <HeaderStyled>
      <Lens />
      <Typography className="text">{t('overview')}</Typography>
      <div className="dateWrapper">
        <div className="buttonWrapper">
          <Button
            className={clsx('button', {
              buttonClicked: dateButton === 'today',
            })}
            variant="outlined"
            onClick={handleClickToday}
          >
            {t('today')}
          </Button>
          <Button
            className={clsx('button', {
              buttonClicked: dateButton === 'week',
            })}
            variant="outlined"
            onClick={handleClickWeek}
          >
            {t('week')}
          </Button>
          <Button
            className={clsx('button', {
              buttonClicked: dateButton === 'month',
            })}
            variant="outlined"
            onClick={handleClickMonth}
          >
            {t('month')}
          </Button>
        </div>
        <DateRangePicker
          displayFormat="DD/MM/YYYY"
          startDate={moment(dates.startDate)}
          startDateId="overview_start_date_id"
          startDatePlaceholderText={t('startDate')}
          endDate={moment(dates.endDate)}
          endDateId="overview_end_date_id"
          endDatePlaceholderText={t('endDate')}
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusChange}
          isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
          numberOfMonths={1}
          small
        />
      </div>
    </HeaderStyled>
  );
}

export default HeaderController;
