import React from 'react';
import FAQCategoryEditContainer from '../../containers/FAQCategory/CategoryForm';

export default function FAQCategoryEdit({ history }) {
  return <FAQCategoryEditContainer pageType="edit" history={history} />;
}
