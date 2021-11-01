import styled from 'styled-components';
import { BOX_SHADOW, FEATURE_COLOR } from '../../../styles/configs';

const ServiceManageStyled = styled.div`
  .container {
    min-height: 70vh;
    padding: 10px;
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
  .conversationSearch {
    margin-bottom: 10px;
  }
  .campaignTable {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

const TableStyled = styled.div`
  .headerCell {
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 13px 8px;
  }
  .bodyRow {
    cursor: pointer;
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
  }
  .bodyCell {
    cursor: pointer;
    padding: 8px;
    &.nameBodyCell {
      min-width: 140px;
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

const MenuActionStyled = styled.div`
  .iconAction {
    margin-right: 5px;
  }
`;

export {
  ServiceManageStyled,
  TableStyled,
  ConversationSearchStyled,
  MenuActionStyled,
};
