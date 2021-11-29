import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const FormCreateRoomStyled = styled.div`
  display: flex;
  justify-content: center;
  .groupButtonSelect {
    display: flex;
    flex-direction: column;
    width: 30%;
  }
  .buttonSelect {
    background-color: ${FEATURE_COLOR.havelockBlue};
    margin: 10px 10px;
    color: white;
  }
  .group-button-step-2 {
    display: flex;
    justify-content: center;
  }
`;

export { FormCreateRoomStyled };
