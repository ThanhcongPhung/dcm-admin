import styled from 'styled-components';
import {
  FEATURE_COLOR,
  BOX_SHADOW,
  BORDER_RADIUS,
} from '../../../styles/configs';

const DetailIntentStyled = styled.div`
  .infoWrapper {
    margin-top: 10px;
    .label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .inputTitle {
        text-align: right;
        &.inputError {
          color: ${FEATURE_COLOR.textError};
        }
      }
    }
  }
  .icon {
    cursor: pointer;
    &.iconDelete {
      color: ${FEATURE_COLOR.froly};
    }
  }
  .table {
    margin-top: 20px;
    .tableRow {
      .tableCell {
        padding: 8px;
      }
    }
  }
`;

const DetailUsecaseStyled = styled.div`
  .header {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .list {
    margin-right: 10px;
  }
  .listItem {
    padding: 10px 8px;
    margin-bottom: 15px;
    border-radius: ${BORDER_RADIUS}px;
    border: 1px solid ${FEATURE_COLOR.border};
    &:hover {
      background-color: ${FEATURE_COLOR.buttercup};
    }
    &.activeList {
      background-color: ${FEATURE_COLOR.buttercup};
    }
    .MuiListItemIcon-root {
      min-width: 30px;
    }
    .noData {
      justify-content: center;
      align-items: center;
      display: flex;
      padding: 50px 0;
    }
  }
`;

const CreateUsecaseStyled = styled.div`
  min-width: 400px;
  .cardHeader {
    padding-bottom: 10px;
    .titleHeader {
      font-size: 18px;
      font-weight: bold;
    }
    .iconButton {
      box-shadow: ${BOX_SHADOW.button};
      margin-left: 10px;
      background-color: ${FEATURE_COLOR.white};
      padding: 8px;
      &:hover {
        background-color: ${FEATURE_COLOR.backgroundMenu};
      }
      &.buttonSuccess {
        background-color: ${FEATURE_COLOR.oceanGreen};
      }
      .success {
        color: ${FEATURE_COLOR.white};
      }
    }
  }
  .cardContent {
    padding: 10px;
    .infoWrapper {
      margin-top: 10px;
      .label {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .textInput {
        width: 100%;
      }
      .inputTitle {
        text-align: right;
        &.inputError {
          color: ${FEATURE_COLOR.textError};
        }
      }
    }
  }
`;

export { DetailIntentStyled, DetailUsecaseStyled, CreateUsecaseStyled };
