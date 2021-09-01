import styled from 'styled-components';
import { BORDER_RADIUS, BOX_SHADOW, FEATURE_COLOR } from '../../styles/configs';

const CreateCampaignStyled = styled.div`
  .cardActions {
    padding-left: 0;
    padding-right: 0;
    padding-top: 20px;
    justify-content: flex-end;
  }
`;

const CreateBaseContentsStyled = styled.div`
  .infoWrapper {
    margin-top: 10px;
    .label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .inputTitle {
        text-align: right;
        &.inputError {
          color: ${FEATURE_COLOR.textError};
        }
      }
    }
    .textInput,
    .dateTimeInput {
      width: 100%;
    }
    .editor {
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: ${BORDER_RADIUS}px;
      font-size: 18px;
      padding: 7px;
      &.error {
        border-color: ${FEATURE_COLOR.textError};
      }
      .rdw-editor-main {
        max-height: 400px;
      }
    }
    .formControlWrapper {
      display: flex;
      align-items: center;
    }
  }
  .imgUpload {
    display: flex;
    align-items: center;
    .image {
      margin-right: 20px;
      height: 180px;
      max-width: calc(100% - 84px);
      &.media {
        width: 350px;
      }
    }
    .uploadButton {
      .uploadInput {
        display: none;
      }
    }
  }
  .date-container {
    display: flex;
    align-items: center;
  }
`;

const ConfirmStyled = styled.div`
  .public-DraftStyleDefault-block {
    margin: 0;
  }
  .item {
    margin-bottom: 32px;
    .paper {
      margin-bottom: 16px;
    }
    .title {
      font-weight: bold;
    }
  }
`;
const IntegrateBotStyled = styled.div`
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
`;

export {
  CreateCampaignStyled,
  CreateBaseContentsStyled,
  ConfirmStyled,
  IntegrateBotStyled,
};
