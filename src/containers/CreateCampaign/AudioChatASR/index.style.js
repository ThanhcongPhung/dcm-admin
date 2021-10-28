import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const DetailValidASRStyled = styled.div`
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

  .containerTemplate {
    margin: auto;
  }

  .cardStyle {
    display: flex;
    flex-direction: column;
  }

  .cardHeader {
    padding: 1em 2em;
    box-shadow: 0 4px 80px grey;
  }

  .listItem {
    height: 230px;
    background-color: ${FEATURE_COLOR.white};
    overflow: auto;
    margin-top: 4px;
  }

  .detailValidButton {
    margin: 0.5em 0;
  }
`;
const DetailCollectASRStyled = styled.div`
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

  .containerTemplate {
    margin: auto;
  }

  .cardStyle {
    display: flex;
    flex-direction: column;
  }

  .cardHeader {
    padding: 1em 2em;
    box-shadow: 0 4px 80px grey;
  }

  .listItem {
    height: 230px;
    background-color: ${FEATURE_COLOR.white};
    overflow: auto;
    margin-top: 4px;
  }

  .detailValidButton {
    margin: 0.5em 0;
  }
`;
export { DetailValidASRStyled, DetailCollectASRStyled };
