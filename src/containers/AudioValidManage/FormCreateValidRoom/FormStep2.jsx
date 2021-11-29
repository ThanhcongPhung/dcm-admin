import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { CAMPAIGN_TYPE } from '../../../constants';
import CreateCommonRoomForm from './CreateCommonRoomForm';

function FormStep2({ stepCreate, setStepCreate, validType }) {
  const { t } = useTranslation();

  const addOrEdit = (room, resetForm, listAudio) => {
    const body = {
      name: listAudio.title,
      listAudio: listAudio.arraylist,
    };
    console.log(body);
  };

  const detailCondition = () => {
    switch (validType) {
      case CAMPAIGN_TYPE.CONVERSATION_VALIDATION: {
        return <div>conversation</div>;
      }
      case CAMPAIGN_TYPE.FAQ_VALIDATION: {
        return <div>faq</div>;
      }
      case CAMPAIGN_TYPE.VAD_VALIDATION: {
        return <div>cvad</div>;
      }
      case CAMPAIGN_TYPE.COMMON_VALIDATION: {
        return <CreateCommonRoomForm addOrEdit={addOrEdit} />;
      }
      default:
        return <div />;
    }
  };
  return (
    <div>
      {detailCondition()}
      <CreateCommonRoomForm addOrEdit={addOrEdit} />
      <div className="group-button-step-2">
        <Button
          onClick={() => setStepCreate(0)}
          className="backButton"
          variant="contained"
          startIcon={<ArrowBack />}
        >
          {t('back')}
        </Button>
      </div>
    </div>
  );
}

export default FormStep2;
