import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { FAQ_CATEGORY_STATUS } from '../../../constants';

export default function SubCategory({
  inputFields,
  setInputFields,
  field,
  valueKey,
  pageType,
  placeholder,
  setDeleteField,
  deleteField,
}) {
  const handleAddField = async () => {
    const temp = [
      ...inputFields,
      {
        id: uuidv4(),
        [valueKey]: '',
        status: FAQ_CATEGORY_STATUS.INPUT_STATUS_NEW,
      },
    ];
    await setInputFields((prev) => ({
      ...prev,
      [field]: temp,
    }));
  };

  const handleRemoveFields = async (inputField) => {
    if (
      pageType === 'edit' &&
      inputField.status !== FAQ_CATEGORY_STATUS.INPUT_STATUS_NEW
    ) {
      setDeleteField([...deleteField, inputField.id]);
    }
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === inputField.id),
      1,
    );
    await setInputFields((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const handleChangeUserSay = async (id, event) => {
    const newInputFields = inputFields.map((i) => {
      const item = i;
      if (id === i.id) {
        item[valueKey] = event.target.value;
        if (!item.status) {
          item.status = FAQ_CATEGORY_STATUS.INPUT_STATUS_DRAFT;
        }
      }
      return item;
    });

    await setInputFields((prev) => ({
      ...prev,
      [field]: newInputFields,
    }));
  };

  return (
    <div>
      {inputFields &&
        inputFields.map((inputField) => (
          <div key={inputField.id}>
            <TextField
              inputProps={{ 'aria-label': 'naked' }}
              variant="outlined"
              value={inputField[valueKey]}
              onChange={(e) => handleChangeUserSay(inputField.id, e)}
              placeholder={placeholder}
              readOnly={pageType === 'view'}
              margin="normal"
              className="subCategoryInput"
            />
            <IconButton
              onClick={() => handleRemoveFields(inputField)}
              style={{ marginTop: '20px' }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAddField} style={{ marginTop: '20px' }}>
              <AddIcon />
            </IconButton>
          </div>
        ))}
    </div>
  );
}
