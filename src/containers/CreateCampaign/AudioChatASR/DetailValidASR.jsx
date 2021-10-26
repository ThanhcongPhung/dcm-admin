import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { CheckCircle, SwapHoriz } from '@material-ui/icons';
import api from '../../../apis';
import { DetailValidASRStyled } from './index.style';

function getIndex(a, value) {
  const index = a
    .map((x) => {
      return x.id;
    })
    .indexOf(value);
  return index;
}

function not(a, b) {
  const result = a.filter((value) => getIndex(b, value.id) === -1);
  return result;
}

function intersection(a, b) {
  const result = a.filter((value) => getIndex(b, value.id) !== -1);
  return result;
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const SIDE = {
  RIGHT: 'right',
  LEFT: 'left',
};

export default function DetailValidASR({ onSetValidRoom }) {
  const [right, setRight] = useState([]);
  const [validRoom, setValidRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation();

  const leftChecked = intersection(selected, validRoom);
  const rightChecked = intersection(selected, right);

  const fetchValidRooms = async (fields) => {
    setIsLoading(true);
    const { offset, search } = fields;
    const { data } = await api.validRoomASR.getValidRoomList({
      offset,
      search,
      limit: 10,
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      const roomList = data.result.validRooms;
      setValidRoom(roomList);
    } else {
      setIsLoading(false);
    }
  };

  const isSelected = (name) => getIndex(selected, name.id) !== -1;

  const handleToggle = (value) => () => {
    const currentIndex = getIndex(selected, value.id);
    const newChecked = [...selected];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelected(newChecked);
  };

  const numberOfChecked = (items) => intersection(selected, items).length;

  const handleAccept = (items, side) => {
    if (side === SIDE.RIGHT) {
      const idList = [];
      items.map((value) => idList.push(value.id));
      onSetValidRoom(idList);
    }
  };

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setSelected(not(selected, items));
    } else {
      setSelected(union(selected, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setValidRoom(not(validRoom, leftChecked));
    setSelected(not(selected, leftChecked));
  };

  const handleCheckedLeft = () => {
    setValidRoom(validRoom.concat(rightChecked));
    setRight(not(right, rightChecked));
    setSelected(not(selected, rightChecked));
  };

  const handleSwap = () => {
    setRight(validRoom);
    setValidRoom(right);
  };

  const avatarCheckbox = (items, itemLength) => {
    return (
      <Checkbox
        onClick={handleToggleAll(items)}
        checked={numberOfChecked(items) === itemLength && itemLength !== 0}
        indeterminate={
          numberOfChecked(items) !== itemLength && numberOfChecked(items) !== 0
        }
        disabled={itemLength === 0}
        inputProps={{ 'aria-label': 'all items selected' }}
      />
    );
  };

  const CardSelector = (title, items, side) => {
    // eslint-disable-next-line react/destructuring-assignment
    const itemLength = items.length;
    return (
      <Card className="cardStyle" component={Paper}>
        <CardHeader
          className="cardHeader"
          avatar={avatarCheckbox(items, itemLength)}
          title={title}
          subheader={`${numberOfChecked(items)}/${itemLength} ${t(
            'hasSelected',
          )}`}
        />
        <List className="listItem" dense component="div" role="list">
          {/* eslint-disable-next-line react/destructuring-assignment */}
          {items.map((value) => {
            const labelId = `transfer-list-all-item-${value.id}-label`;
            const isItemSelected = isSelected(value);

            return (
              <ListItem
                key={value.id}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={isItemSelected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.name}`} />
                <ListItemText>
                  {value.status ? <CheckCircle /> : ''}
                </ListItemText>
              </ListItem>
            );
          })}
          <ListItem />
        </List>
        {side === SIDE.RIGHT && (
          <Button
            variant="outlined"
            style={{ margin: 12 }}
            disabled={rightChecked.length === 0}
            onClick={() => handleAccept(items, side)}
          >
            {t('accept')}
          </Button>
        )}
      </Card>
    );
  };

  useEffect(() => {
    fetchValidRooms({});
  }, []);

  return (
    <DetailValidASRStyled>
      <Grid container spacing={2} className="infoWrapper">
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className="containerTemplate"
        >
          <Grid item>
            <Paper elevation={3}>
              {CardSelector(t('roomListPrepare'), validRoom, SIDE.LEFT)}
            </Paper>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className="detailValidButton"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className="detailValidButton"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className="detailValidButton"
                onClick={handleSwap}
              >
                <SwapHoriz />
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              {CardSelector(t('roomSelected'), right, SIDE.RIGHT)}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {isLoading && (
        <TableRow>
          <TableCell>
            <CircularProgress />
          </TableCell>
        </TableRow>
      )}
    </DetailValidASRStyled>
  );
}
