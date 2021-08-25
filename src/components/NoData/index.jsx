import React from 'react';
import { InputAdornment } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { TextFieldStyled } from './index.style';

export default function NoData({ text }) {
  return (
    <TextFieldStyled
      value={text}
      variant="outlined"
      fullWidth
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <Info color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
}
