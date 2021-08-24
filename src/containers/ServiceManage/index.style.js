import styled from 'styled-components';
import { BOX_SHADOW, FEATURE_COLOR } from '../../styles/configs';

const ServiceManageStyled = styled.div`
  .container {
    min-height: 70vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    align-items: center;
    margin-bottom: 20px;
    .headTitle {
      text-transform: uppercase;
    }
    .headButtons {
      display: flex;
      justify-content: flex-end;
      justify-content: center;
    }
    .iconButton {
      background-color: ${FEATURE_COLOR.havelockBlue};
      box-shadow: ${BOX_SHADOW.card};
      .addIcon {
        color: ${FEATURE_COLOR.white};
      }
    }
  }
  .serviceTable {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

const SearchStyled = styled.div`
  .searchInput {
    margin-right: 10px;
    .MuiOutlinedInput-input {
      padding: 13px;
    }
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
    .chipInput {
      margin: 2px 2px 0 0;
    }
    .MuiChip-label {
      padding: 5px;
    }
  }
  .dropdownItem {
    display: flex;
    text-transform: capitalize;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    padding: 10px 20px;
    margin: 0 5px;
    border-radius: 2px;
    -webkit-transition: all 150ms linear;
    transition: all 150ms linear;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    white-space: nowrap;
    height: unset;
  }
`;

const ServiceInfoStyled = styled.div`
  min-width: 600px;
  .infoWrapper {
    margin-top: 10px;
    .label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .textInput {
      width: 100%;
    }
    .inputError {
      color: ${FEATURE_COLOR.textError};
    }
    &.textHelper {
      margin-bottom: 10px;
    }
    .select {
      width: 100%;
      .MuiInput-underline::before {
        border: none;
      }
      .MuiInput-underline::after {
        border: none;
      }
      .chipInput {
        margin-right: 3px;
      }
    }
  }
  .dialogAction {
    margin-top: 10px;
  }
`;

export { ServiceManageStyled, SearchStyled, TableStyled, ServiceInfoStyled };
