import React from 'react';
import FAQCategoryCreateContainer from '../../containers/FAQCategory/CategoryForm';

export default function FAQCategoryCreate({ history }) {
  return <FAQCategoryCreateContainer pageType="create" history={history} />;
}
