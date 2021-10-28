import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const IntentManageStyled = styled.div`
  .container {
    min-height: 70vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .header {
    .headTitle {
      text-transform: uppercase;
    }
  }
  .header-action {
    margin: 16px 0px 12px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headButtons {
      .addBtn {
        background: ${FEATURE_COLOR.havelockBlue};
      }
    }
    .intentSearch {
      width: calc(100% / 4 - 10px);
    }
  }
  .intentTable {
    flex: 1;
  }
  .pagination {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
`;

const TableStyled = styled.div`
  .table {
    min-height: 300px;
  }
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
  .bodyCell {
    cursor: pointer;
    padding: 8px;
    &.nameBodyCell {
      min-width: 140px;
    }
  }
  .emptyDataText {
    width: 100%;
    margin-left: 20px;
    color: ${FEATURE_COLOR.text};
  }
`;

const CreateIntentModalStyled = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  .contentModal {
    width: 650px;
    padding: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    max-height: 90vh;
    overflow: auto;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .form {
      margin-top: 20px;
      margin-bottom: 20px;
      .label {
        margin-bottom: 8px;
      }
      .nameItem {
        margin-bottom: 16px;
      }
      .slotItem {
        .tableContainer {
          max-height: 50vh;
          overflow: auto;
        }
        .table {
          table-layout: fixed;
        }
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
          height: 50px;
        }
        .bodyCell {
          flex: 1;
          cursor: pointer;
          &.nameBodyCell {
            min-width: 140px;
          }
          word-wrap: break-word;
        }
      }
      .mr2 {
        margin-right: 2px;
      }
      .errorText {
        margin-right: 14px;
        margin-left: 14px;
        margin-top: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #f44336;
      }
    }
    .btnContainer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 12px;
    }
    .emptyDataText {
      margin-top: 8px;
      margin-bottom: 8px;
      text-align: center;
    }
  }
`;

export { IntentManageStyled, TableStyled, CreateIntentModalStyled };
