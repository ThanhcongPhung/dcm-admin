import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const PopupFormStyle = styled.div`
  .dialog-wrapper {
    padding: spacing(2);
    position: absolute;
    top: spacing(5);
  }
`;

const ImportAudioStyle = styled.div`
  .text-form-1 {
    display: flex;
    flex-direction: column;
  }
  .select-type {
    display: flex;
    justify-content: center;
    .importMode {
      width: 200px;
    }
  }
  .upload-form {
    margin-top: 10px;
    display: flex;
    padding: 0.7rem 0;
    justify-content: center;
    align-content: end;
  }
  .importButton {
    background-color: ${FEATURE_COLOR.havelockBlue};
    color: ${FEATURE_COLOR.white};
    font-weight: 500;
    margin: 0 10px;
  }
  .backButton {
    background-color: ${FEATURE_COLOR.froly};
    color: ${FEATURE_COLOR.white};
    font-weight: 500;
    margin: 0 10px;
  }
  .inputFile {
    box-sizing: border-box;
    max-width: 100%;
    padding: 1px 5px;
    height: 36px;
    border: 1px solid ${FEATURE_COLOR.havelockBlue};
    outline: none;
  }
  .importResult {
    display: flex;
    justify-content: center;
    border-radius: 10px;
    height: 200px;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.23);
    align-items: center;
    margin-top: 10px;
  }
  .resultWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
  }
  .spanResult {
    display: flex;
    justify-content: center;
  }
  .group-button-step-3 {
    display: flex;
    justify-content: center;
  }
  .group-button-step-2 {
    display: flex;
    justify-content: center;
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
`;

export { PopupFormStyle, ImportAudioStyle };
