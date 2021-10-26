import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Typography, Card } from '@material-ui/core';
import FormBase from './CategoryBase';
import MemberInfo from './MemberInfo';
import api from '../../../apis';
import { FAQ_CATEGORY_STATUS } from '../../../constants';
import route from '../../../constants/route';
import { FormStyle } from './index.style';

export default function CategoryFormContainer({ pageType, history }) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [deleteField, setDeleteField] = useState([]);
  const [category, setCategory] = useState({
    title: '',
    description: '',
    members: [],
    childs: [],
  });
  const { categoryId } = useParams();

  const fetchCategory = async () => {
    const { data } = await api.faqCategory.getCategory(categoryId);
    if (data.status) setCategory(data.result);
  };

  useEffect(() => {
    if (pageType !== 'create' && categoryId) fetchCategory();
  }, [pageType, categoryId]);

  const handleSubmit = async () => {
    setSubmitted(true);
    if (category.title) {
      switch (pageType) {
        case 'create': {
          const createFields = {
            ...category,
            memberIds: category.members.map((item) => item.userId),
            childs: category.childs,
          };
          const { data } = await api.faqCategory.createCategory(createFields);
          if (data.status) history.push(route.FAQ_INTENT_CATEGORIES);
          break;
        }
        case 'edit': {
          const updateFields = {
            title: category.title,
            description: category.description,
            memberIds: category.members.map((item) => item.userId),
            newChild: category.childs.filter(
              (item) => item.status === FAQ_CATEGORY_STATUS.INPUT_STATUS_NEW,
            ),
            deleteChild: deleteField,
            updateChild: category.childs.filter(
              (item) => item.status === FAQ_CATEGORY_STATUS.INPUT_STATUS_DRAFT,
            ),
          };
          const { data } = await api.faqCategory.updateCategory(
            categoryId,
            updateFields,
          );
          if (data.status) history.push(route.FAQ_INTENT_CATEGORIES);
          break;
        }
        default:
          history.push(route.FAQ_INTENT_CATEGORIES);
          break;
      }
    }
  };

  return (
    <FormStyle>
      <div className="campaign-create-container">
        <div className="header">
          <Typography variant="h4" className="headTitle">
            {pageType === 'create' && t('createCategory')}
            {pageType === 'edit' && t('editCategory')}
          </Typography>
          <div className="headButtons">
            <Button
              variant="contained"
              className="categoryButton"
              onClick={handleSubmit}
            >
              {pageType === 'create' ? t('createCategory') : t('edit')}
            </Button>
          </div>
        </div>
        <div>
          <Card className="card">
            <div className="cardHeader">
              <Typography variant="h5" className="headerText">
                {t('infoBase')}
              </Typography>
            </div>
            <div className="cardBody">
              <FormBase
                category={category}
                setCategory={setCategory}
                pageType={pageType}
                submitted={submitted}
                deleteField={deleteField}
                setDeleteField={setDeleteField}
              />
            </div>
          </Card>
          <MemberInfo
            category={category}
            setCategory={setCategory}
            pageType={pageType}
          />
        </div>
      </div>
    </FormStyle>
  );
}
