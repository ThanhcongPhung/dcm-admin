import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { FEATURE_COLOR } from '../../styles/configs';

export const TextFieldStyled = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border: 1px solid ${FEATURE_COLOR.primary};
    }
    &:hover fieldset {
      border: 1px solid ${FEATURE_COLOR.primary};
    }
    &.Mui-focused fieldset {
      border: 1px solid ${FEATURE_COLOR.primary};
    }
  }
`;
