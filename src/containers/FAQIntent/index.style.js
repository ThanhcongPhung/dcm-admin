import styled from 'styled-components';
import { BOX_SHADOW, FEATURE_COLOR } from '../../styles/configs';

const ManageStyled = styled.div`
  .manage-container {
    min-height: 500px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
  }
  .headTitle {
    text-transform: uppercase;
  }
  .headButtons {
    display: flex;
    justify-content: flex-end;
    .headButton {
      margin: 5px;
      padding: 5px;
      color: white;
    }
  }
  .iconButton {
    background-color: ${FEATURE_COLOR.havelockBlue};
    box-shadow: ${BOX_SHADOW.card};
    .addIcon {
      color: ${FEATURE_COLOR.white};
    }
  }
  .intentTable {
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
    padding: 8px;
  }
  .bodyCell {
    padding: 8px;
    .customChip {
      margin: 5px;
    }
  }
  .iconAction {
    margin-right: 5px;
  }
`;

export { ManageStyled, TableStyled };
