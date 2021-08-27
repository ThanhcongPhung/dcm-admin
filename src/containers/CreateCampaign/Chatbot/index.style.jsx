import styled from 'styled-components';
import { FEATURE_COLOR, BOX_SHADOW } from '../../../styles/configs';

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
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
`;

const CreateUsecaseStyled = styled.div`
  margin-top: 15px;
  .usecase {
    margin-bottom: 16px;
    .iconButton {
      box-shadow: ${BOX_SHADOW.button};
      margin-left: 10px;
      background-color: ${FEATURE_COLOR.white};
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
    .content {
      padding-top: 0;
    }
  }
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
`;

export { DetailIntentStyled, DetailUsecaseStyled, CreateUsecaseStyled };
