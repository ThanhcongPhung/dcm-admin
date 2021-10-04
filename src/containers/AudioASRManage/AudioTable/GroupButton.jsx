import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { Publish, GetApp, AddBox, Delete } from '@material-ui/icons';
import { GroupButtonStyle } from './index.style';

export default function GroupButton({ setOpenFormInput }) {
  const { t } = useTranslation();

  return (
    <GroupButtonStyle>
      <div className="groupButton">
        <div className="buttonWrapper">
          <Button
            className="functionButton"
            variant="contained"
            startIcon={<Publish />}
            onClick={() => setOpenFormInput(true)}
          >
            {t('import')}
          </Button>
        </div>
        <div className="buttonWrapper">
          <Button
            className="functionButton"
            variant="contained"
            startIcon={<GetApp />}
          >
            {t('export')}
          </Button>
        </div>
        <div className="buttonWrapper">
          <Button
            variant="contained"
            className="functionButton deleteButton"
            startIcon={<Delete />}
          >
            {t('delete')}
          </Button>
        </div>
        <div className="buttonWrapper">
          <Button
            variant="contained"
            className="functionButton createButton"
            startIcon={<AddBox />}
          >
            {t('createValidateAudioRoom')}
          </Button>
        </div>
      </div>
    </GroupButtonStyle>
  );
}
