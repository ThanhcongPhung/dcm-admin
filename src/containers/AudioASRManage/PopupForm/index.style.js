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
  .inputFile {
    box-sizing: border-box;
    max-width: 100%;
    padding: 1px 5px;
    height: 36px;
    border: 1px solid ${FEATURE_COLOR.havelockBlue};
    outline: none;
  }
`;

export { PopupFormStyle, ImportAudioStyle };
