import React, { useState } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { TextFieldStyled } from './index.style';

export default function DataInfo({ text, isPassword }) {
  const [visible, setVisible] = useState(!isPassword);

  return (
    <TextFieldStyled
      type={visible ? 'text' : 'password'}
      value={text}
      variant="outlined"
      fullWidth
      InputProps={{
        readOnly: true,
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton onClick={() => setVisible(!visible)}>
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
