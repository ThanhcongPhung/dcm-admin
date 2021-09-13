import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const AddParticipantStyled = styled(Grid)`
  .label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .icon {
    cursor: pointer;
    &.iconDelete {
      color: ${FEATURE_COLOR.froly};
    }
  }
`;

const ParticipantTableStyled = styled.div`
  padding: 20px 10px;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  .titleTable {
    margin-bottom: 20px;
  }
  .headerCell {
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 12px;
  }
  .bodyCell {
    padding: 8px;
    &.role {
      font-weight: bold;
    }
    .avatar {
      margin: 0 auto;
    }
  }
  .doneIcon {
    color: ${FEATURE_COLOR.oceanGreen};
  }
`;

export { AddParticipantStyled, ParticipantTableStyled };
