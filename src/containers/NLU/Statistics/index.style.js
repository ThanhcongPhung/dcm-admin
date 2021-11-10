import styled from 'styled-components';
import { BOX_SHADOW, FEATURE_COLOR } from '../../../styles/configs';

const StatisticsStyled = styled.div`
  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    align-items: center;
    .headTitle {
      text-transform: uppercase;
    }
    .headButtons {
      display: flex;
      justify-content: flex-end;
      justify-content: center;
    }
    .iconButton {
      background-color: ${FEATURE_COLOR.havelockBlue};
      box-shadow: ${BOX_SHADOW.card};
      .addIcon {
        color: ${FEATURE_COLOR.white};
      }
    }
  }
  .statisticsOverview {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .conversationSearch {
    margin-bottom: 10px;
  }
  .campaignTable {
    flex: 1;
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const TableStyled = styled.div`
  .headerCell {
    background: ${FEATURE_COLOR.havelockBlue};
    color: ${FEATURE_COLOR.white};
    padding: 13px 8px;
  }

  .bodyRow {
    cursor: pointer;
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
  }
  .bodyRowFalse {
    background: rgba(178, 34, 52, 0.1);
  }
  .bodyCell {
    cursor: pointer;
    padding: 8px;
    .intentText {
      font-weight: bold;
    }
    &.status {
      font-weight: bold;
    }
    &.end {
      color: ${FEATURE_COLOR.froly};
    }
    &.time {
      min-width: 85px;
    }
    .viewParticipant {
      cursor: pointer;
      color: ${FEATURE_COLOR.havelockBlue};
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ConversationSearchStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  .searchItem {
    flex: 1;
  }
`;

const StatisticsOverviewStyled = styled.div``;

const StatisticsCardStyled = styled.div`
  padding: 20px;
  border-left: 5px solid
    ${(props) => props.borderColor || FEATURE_COLOR.havelockBlue};
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  .labelText {
    font-size: 18px;
  }
  .valueText {
    font-weight: bold;
  }
`;

export {
  StatisticsStyled,
  TableStyled,
  ConversationSearchStyled,
  StatisticsOverviewStyled,
  StatisticsCardStyled,
};
