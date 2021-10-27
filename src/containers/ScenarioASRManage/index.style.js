import styled from 'styled-components';
import { BOX_SHADOW, FEATURE_COLOR } from '../../styles/configs';

const ScenarioManageStyled = styled.div`
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
  .campaignSearch {
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

const ScenarioFormStyled = styled.div`
  .infoWrapper {
    margin-top: 10px;
    .label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .textInput {
      width: 100%;
    }
    .inputError {
      color: ${FEATURE_COLOR.textError};
    }
    &.textHelper {
      margin-bottom: 10px;
    }
    .select {
      width: 100%;
      .MuiInput-underline::before {
        border: none;
      }
      .MuiInput-underline::after {
        border: none;
      }
      .chipInput {
        margin-right: 3px;
      }
    }
  }
  .dialogAction {
    margin-top: 10px;
  }
  .slotValue {
    margin-left: 50px;
    margin-top: 10px;
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
export { ScenarioManageStyled, TableStyled, ScenarioFormStyled };
