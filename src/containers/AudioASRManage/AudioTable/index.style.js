import { Table } from '@material-ui/core';
import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const TableAudioStyle = styled(Table)`
  .headerCell {
    font-weight: 600;
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 13px 8px;
  }
  .headerCellContent {
    font-weight: 600;
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 13px 8px;
    width: 200px;
  }
  .bodyRow {
    cursor: pointer;
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
  }
  .formControlLabel {
    margin: 0;
    padding: 0;
  }
  .bodyCell {
    cursor: pointer;
    padding: 8px;
    .audioContent {
      min-width: 140px;
      //max-width: 200px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      flex: 1;
    }
    .action {
      width: 100px;
    }
  }
  .tableCellCollapse {
    padding: 0;
    .tableCell {
      min-width: 150px;
    }
  }
`;

const GroupButtonStyle = styled.div`
  .groupButton {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .buttonWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .functionButton {
    background-color: ${FEATURE_COLOR.havelockBlue};
    color: ${FEATURE_COLOR.white};
    margin-left: 10px;
    &.deleteButton {
      background-color: ${FEATURE_COLOR.froly};
      color: ${FEATURE_COLOR.white};
    }
    &.createButton {
      background-color: ${FEATURE_COLOR.oceanGreen};
      color: ${FEATURE_COLOR.white};
      min-width: 198px;
    }
  }
`;

export { TableAudioStyle, GroupButtonStyle };
