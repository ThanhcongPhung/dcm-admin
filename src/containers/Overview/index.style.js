import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const overViewStyled = styled.div``;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .text {
    flex-grow: 1;
    text-transform: uppercase;
  }
  .dateWrapper {
    flex: 1;
    display: flex;
    .buttonWrapper {
      display: flex;
      align-items: center;
    }
  }
  .button {
    margin-right: 10px;
    border-radius: 10px;

    &:hover {
      background-color: ${FEATURE_COLOR.primary};
      color: ${FEATURE_COLOR.white};
    }
  }
  .buttonClicked {
    background-color: ${FEATURE_COLOR.primary};
    color: ${FEATURE_COLOR.white};
  }
`;

const SummaryStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
  margin-top: 10px;
  .addonBefore {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &.addonBefore_1 {
      height: 10px;
      background-color: ${FEATURE_COLOR.buttercup};
    }
    &.addonBefore_2 {
      height: 10px;
      background-color: ${FEATURE_COLOR.froly};
    }
    &.addonBefore_3 {
      height: 10px;
      background-color: ${FEATURE_COLOR.havelockBlue};
    }
    &.addonBefore_4 {
      height: 10px;
      background-color: ${FEATURE_COLOR.mediumPurple};
    }
    &.addonBefore_5 {
      height: 10px;
      background-color: ${FEATURE_COLOR.oceanGreen};
    }
    &.addonBefore_6 {
      height: 10px;
      background-color: ${FEATURE_COLOR.primary};
    }
    &.addonBefore_7 {
      height: 10px;
      background-color: ${FEATURE_COLOR.textError};
    }
    &.addonBefore_8 {
      height: 10px;
      background-color: ${FEATURE_COLOR.text};
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 10px;
    .number {
      margin: 10px 0;
      font-weight: bold;
    }
  }
`;

export { overViewStyled, HeaderStyled, SummaryStyled };
