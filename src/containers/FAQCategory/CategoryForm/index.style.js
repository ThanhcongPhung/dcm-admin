import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const FormStyle = styled.div`
  .campaign-create-container {
    min-height: 500px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    .headTitle {
      text-transform: uppercase;
    }
  }
  .categoryButton {
    background-color: ${FEATURE_COLOR.havelockBlue};
    color: ${FEATURE_COLOR.white};
  }
  .card {
    color: rgba(0, 0, 0, 0.87);
    border: 0;
    word-wrap: break-word;
    font-size: 0.875rem;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    border-radius: 6px;
    padding: 10px 15px 15px 15px;
    overflow: visible;
    margin-top: 25px;
  }
  .cardHeader {
    padding: 8px 20px 8px 10px;
    margin-top: -20px;
    border-radius: 3px;
    background-color: ${FEATURE_COLOR.havelockBlue};
    color: #fff;
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    .header {
      align-items: center;
      display: flex;
      width: 100%;
    }
  }
  .headerText {
    margin: 0;
    line-height: 30px;
    flex: 1;
    color: #fff;
    padding: 0 15px;
  }
  .cardBody {
    flex: 1 1 auto;
    padding: 15px 15px 0px 15px;
    position: relative;
    -webkit-box-flex: 1;
  }
`;

const FormBaseStyle = styled.div`
  .fieldWrapper {
    margin: 10px 0;
  }
  .addSubCategory {
    display: flex;
    align-items: center;
    .pointer {
      cursor: pointer;
    }
    .text-link {
      color: ${FEATURE_COLOR.primary} !important;
    }
  }
  .subCategoryInput {
    width: 80%;
  }
`;

const MemberInfoStyle = styled.div``;

export { FormStyle, FormBaseStyle, MemberInfoStyle };
