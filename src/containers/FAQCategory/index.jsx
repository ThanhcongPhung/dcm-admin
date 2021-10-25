import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, Paper, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import CategoryTable from './CategoryTable';
import routes from '../../constants/route';
import { PAGINATION } from '../../constants';
import api from '../../apis';
import { ManageStyled } from './index.style';

export default function CategoryManage() {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_MANAGE,
    totalPages: 1,
  });

  const fetchCategories = async (fields) => {
    setIsLoading(true);
    const { offset, search } = fields;
    const { data } = await api.faqCategory.getCategories({
      offset: offset || 0,
      search: search || '',
      fields: '',
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setCategories(data.result.categories);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    } else {
      setIsLoading(false);
    }
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchCategories({ offset: (value - 1) * pagination.limit });
  };

  const handleAddCategory = () =>
    history.push(routes.FAQ_INTENT_CATEGORIES_CREATE);

  const onHandleDelete = async (deleteId) => {
    const tempCampaigns = categories.filter((item) => item.id !== deleteId);
    if (tempCampaigns.length) {
      fetchCategories({ offset: (pagination.page - 1) * pagination.limit });
      setPagination((prev) => ({ ...prev, page: pagination.page }));
    } else {
      fetchCategories({
        offset:
          pagination.page > 1 ? (pagination.page - 2) * pagination.limit : 0,
      });
      setPagination((prev) => ({
        ...prev,
        page: pagination.page > 1 ? pagination.page - 1 : 1,
      }));
    }
  };

  const onHandleEdit = (categoryId) =>
    history.push(`/admin/faq/categories/${categoryId}/edit`);

  useEffect(() => {
    fetchCategories({});
  }, []);

  return (
    <ManageStyled>
      <Paper className="manage-container">
        <div className="header">
          <Typography variant="h4" className="headTitle">
            {t('categoryManage')}
          </Typography>
          <div className="headButtons">
            <div className="add-btn">
              <IconButton onClick={handleAddCategory} className="iconButton">
                <AddIcon className="addIcon" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="categoryTable">
          <CategoryTable
            listCategory={categories}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onHandleDelete={onHandleDelete}
            onHandleEdit={onHandleEdit}
<<<<<<< HEAD
            pagination={pagination}
=======
>>>>>>> intent category manage
          />
        </div>
        <div className="pagination">
          <Pagination
            page={pagination.page}
            count={pagination.totalPages}
            onChange={handleChangePagination}
          />
        </div>
      </Paper>
    </ManageStyled>
  );
}
