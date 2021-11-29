import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/Select';
import { useForm, Form } from '../../../components/PopupForm/useForm';
import api from '../../../apis';

const initialFValues = {
  numberOfRoom: [],
};

export default function CreateCommonRoomForm({ addOrEdit }) {
  const [arrayValidate, setArrayValidate] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const { t } = useTranslation();

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialFValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = values.numberOfRoom;
    console.log(index);
    addOrEdit(values, resetForm, arrayValidate[index]);
  };

  const fetchAudios = async (fields) => {
    const { offset, search } = fields;
    const { data } = await api.audioASR.getAudioValidList({
      offset,
      search,
      fields: '',
      sort: 'createdAt_desc',
    });
    if (data.status) {
      setAudioList(data.result.audios);
    }
  };
  useEffect(() => {
    fetchAudios({});
  }, []);
  useEffect(() => {
    const chunkSize = 20;
    const groups = audioList
      .map((e, i) => {
        return i % chunkSize === 0 && audioList.slice(i, i + chunkSize);
      })
      .filter((e) => {
        return e;
      });
    const array = [];
    // eslint-disable-next-line array-callback-return
    groups.map((ele, index) => {
      const object = {};
      const pos = audioList
        .map((e) => {
          return e.id;
        })
        .indexOf(ele[0].id);
      const endIndex = audioList
        .map((e) => {
          return e.id;
        })
        .indexOf(ele[ele.length - 1].id);
      object.id = index;
      object.title = `${pos}-${endIndex}`;
      object.arraylist = ele;
      array.push(object);
    });
    setArrayValidate(array);
    const record = {};
    record.name = '';
    record.numberOfRoom = array;
    setValues({ ...record });
  }, [audioList]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Select
            name="numberOfRoom"
            label="Số lượng phòng"
            value={values.numberOfRoom}
            onChange={handleInputChange}
            options={arrayValidate}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            component="label"
            className="importButton"
            startIcon={<CloudUpload />}
          >
            {t('submit')}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
