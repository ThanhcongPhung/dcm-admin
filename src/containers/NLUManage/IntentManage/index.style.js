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

export { IntentManageStyled, TableStyled };
