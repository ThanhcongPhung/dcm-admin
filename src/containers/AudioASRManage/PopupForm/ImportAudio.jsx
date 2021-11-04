import React, { useState } from 'react';
import { ImportAudioStyle } from './index.style';
import ImportForm from './ImportForm';
import ImportTable from './ImportTable';

function ImportAudio({ step, setStep }) {
  const [audioList, setAudioList] = useState([]);
  const [filePath, setFilePath] = useState();

  return (
    <ImportAudioStyle>
      {/* eslint-disable-next-line no-nested-ternary */}
      {step === 0 ? (
        <ImportForm
          step={step}
          setStep={setStep}
          setAudioList={setAudioList}
          setFilePath={setFilePath}
        />
      ) : // eslint-disable-next-line no-nested-ternary
      step === 1 ? (
        <ImportTable
          setStep={setStep}
          audioList={audioList}
          filePath={filePath}
        />
      ) : step === 2 ? (
        <div>step3</div>
      ) : (
        ''
      )}
    </ImportAudioStyle>
  );
}

export default ImportAudio;
