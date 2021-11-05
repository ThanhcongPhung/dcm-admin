import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ImportAudioStyle } from './index.style';
import ImportForm from './ImportForm';
import ImportTable from './ImportTable';

function ImportAudio({
  step,
  setStep,
  user,
  audioLength,
  setAudioLength,
  setOpenFormInput,
}) {
  const [audioList, setAudioList] = useState([]);
  const { t } = useTranslation();

  const onHandleClose = () => {
    setOpenFormInput(false);
    setStep(0);
  };

  return (
    <ImportAudioStyle>
      {/* eslint-disable-next-line no-nested-ternary */}
      {step === 0 ? (
        <ImportForm step={step} setStep={setStep} setAudioList={setAudioList} />
      ) : // eslint-disable-next-line no-nested-ternary
      step === 1 ? (
        <ImportTable
          user={user}
          setStep={setStep}
          audioList={audioList}
          setAudioList={setAudioList}
          setAudioLength={setAudioLength}
        />
      ) : step === 2 ? (
        <div className="importResult">
          <div className="resultWrapper">
            <span className="spanResult">{t('audioImported')}</span>
            <span className="spanResult">{audioLength}</span>
          </div>
          <div className="group-button-step-3">
            <Button
              onClick={() => onHandleClose()}
              className="backButton"
              variant="contained"
              startIcon={<Close />}
            >
              {t('close')}
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </ImportAudioStyle>
  );
}

export default ImportAudio;
