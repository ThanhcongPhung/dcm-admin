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
  .contentModal {
    width: 500px;
    padding: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    max-height: 80vh;
    overflow: auto;
    .header {
      .headTitle {
        margin-bottom: 16px;
      }
    }
    .form {
      .item {
        margin-top: 8px;
        margin-bottom: 8px;
      }
      .slotHeaderText {
        margin: 0;
      }
    }
    .emptyDataText {
      margin-top: 8px;
      margin-bottom: 8px;
      text-align: center;
    }
  }
`;

export { IntentManageStyled, TableStyled, CreateIntentModalStyled };
