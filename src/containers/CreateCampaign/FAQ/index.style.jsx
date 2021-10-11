import styled from 'styled-components';
import { FEATURE_COLOR, BORDER_RADIUS } from '../../../styles/configs';

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
  .toggle.collapsed:after {
    cursor: pointer;
    content: '\f107';
    vertical-align: middle;
    font-weight: 900;
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
  }
  .toggle.expanded:after {
    cursor: pointer;
    content: '\f106';
    vertical-align: middle;
    font-weight: 900;
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
  }
  .react-dropdown-tree-select .dropdown .dropdown-trigger.arrow.bottom:after {
    font-family: 'Font Awesome 5 Free';
    content: '\f0d7';
    display: inline-block;
    padding-right: 3px;
    vertical-align: middle;
    font-weight: 900;
  }
  .react-dropdown-tree-select .dropdown .dropdown-trigger.arrow.top:after {
    content: '\f0de';
    display: inline-block;
    padding-right: 3px;
    vertical-align: middle;
    font-weight: 900;
    font-family: 'Font Awesome 5 Free';
  }
  .react-dropdown-tree-select .dropdown {
    width: 100%;
  }
  .react-dropdown-tree-select .dropdown .dropdown-trigger {
    border-radius: ${BORDER_RADIUS}px;
    width: 97%;
    padding: 14px;
  }
  .tag-item:last-child {
    margin-right: 4px;
    width: 97%;
  }
  .tag-item .search {
    width: 97%;
    border: none;
  }
  .react-dropdown-tree-select .dropdown .dropdown-content {
    width: 97%;
  }
  .tag {
    color: rgba(0, 0, 0, 0.87);
    border: none;
    cursor: default;
    height: 32px;
    display: inline-flex;
    outline: 0;
    padding: 10px 5px;
    padding-left: 15px;
    font-size: 0.8125rem;
    box-sizing: border-box;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    font-family: Vbee;
    white-space: nowrap;
    border-radius: 16px;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: #e0e0e0;
`;

export { DetailIntentStyled };
