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
  .campaignSearch {
    margin-bottom: 10px;
  }
  .campaignTable {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

const TableStyled = styled.div`
  .headerCell {
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 8px;
    .cellContent {
      display: flex;
      justify-content: space-between;
      padding: 0px 10px;
      align-items: center;
    }
  }
  .bodyRow {
    cursor: pointer;
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
  }
  .bodyCell {
    cursor: pointer;
    padding: 8px;
    &.action {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    &.status {
      font-weight: bold;
    }
    &.end {
      color: ${FEATURE_COLOR.froly};
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

const CampaignSearchStyled = styled.div`
  display: flex;
  margin: 8px 0;
  .search-information {
    min-width: calc(100% / 4 - 10px);
    margin-right: 10px;
  }
`;

const ShowStatusStyled = styled.div`
  .button-status {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .iconButton {
    width: 40px;
    height: 40px;
    .start {
      color: ${FEATURE_COLOR.oceanGreen};
    }
  }
`;

export {
  ServiceManageStyled,
  TableStyled,
  CampaignSearchStyled,
  ShowStatusStyled,
};
