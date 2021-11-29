import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { FormCreateRoomStyled } from './index.style';
import { CAMPAIGN_TYPE } from '../../../constants';
import FormStep2 from './FormStep2';

function FormCreateValidRoom({ audioList, stepCreate, setStepCreate }) {
  const [validType, setValidType] = useState();
  const { t } = useTranslation();
  const handleSetValidType = (type) => {
    setValidType(type);
    setStepCreate(1);
  };
  return (
    <FormCreateRoomStyled>
      {/* eslint-disable-next-line no-nested-ternary */}
      {stepCreate === 0 ? (
        <div className="groupButtonSelect">
          <Button
            variant="contained"
            className="buttonSelect"
            onClick={() =>
              handleSetValidType(CAMPAIGN_TYPE.CONVERSATION_VALIDATION)
            }
          >
            Xác thực hội thoại
          </Button>
          <Button
            variant="contained"
            className="buttonSelect"
            onClick={() => handleSetValidType(CAMPAIGN_TYPE.FAQ_VALIDATION)}
          >
            Xác thực bộ câu hỏi
          </Button>
          <Button
            variant="contained"
            className="buttonSelect"
            onClick={() => handleSetValidType(CAMPAIGN_TYPE.VAD_VALIDATION)}
          >
            Xác thực cắt/ghép âm thanh
          </Button>
          <Button
            variant="contained"
            className="buttonSelect"
            onClick={() => handleSetValidType(CAMPAIGN_TYPE.COMMON_VALIDATION)}
          >
            Xác thực chung
          </Button>
        </div>
      ) : // eslint-disable-next-line no-nested-ternary
      stepCreate === 1 ? (
        <FormStep2
          audioList={audioList}
          stepCreate={stepCreate}
          setStepCreate={setStepCreate}
          validType={validType}
        />
      ) : stepCreate === 2 ? (
        <div>step3</div>
      ) : (
        ''
      )}
    </FormCreateRoomStyled>
  );
}

export default FormCreateValidRoom;
