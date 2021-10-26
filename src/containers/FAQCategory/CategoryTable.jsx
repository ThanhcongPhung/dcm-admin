/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Icon,
  Menu,
  MenuItem,
  Chip,
  CircularProgress,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import api from '../../apis';
import { TableStyled } from './index.style';

const tableTitle = [
  { title: 'STT', width: '5%' },
  { title: 'categoryTitle', width: '20%' },
  { title: 'description', width: '30%' },
  { title: 'subCategories' },
  { title: 'action', width: '10%' },
];

export default function CategoryTable({
  listCategory,
  onHandleDelete,
  setIsLoading,
  isLoading,
  onHandleEdit,
  pagination,
}) {
  const { history } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState();
  const [menuState, setMenuState] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [selectCategoryId, setSelectCategoryId] = useState();

  const handleOpenMenu = (categoryId) => (e) => {
    setAnchorEl(e.currentTarget);
    setSelectCategoryId(categoryId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectCategoryId();
  };

  const handleCloseConfirm = () => {
    setIsDelete(false);
    setSelectCategoryId();
  };

  const handleDeleteCategory = async () => {
    setIsLoading(true);
    setIsDelete(false);
    const { data } = await api.faqCategory.deleteCategory(selectCategoryId);
    setIsLoading(false);
    if (data.status) {
      onHandleDelete(selectCategoryId);
      enqueueSnackbar(t('deleteCategorySuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('deleteCategoryError'), { variant: 'error' });
    }
    setSelectCategoryId(null);
  };

  return (
    <TableStyled>
      <Table>
        <TableHead>
          <TableRow>
            {tableTitle &&
              tableTitle.map((item) => (
                <TableCell
                  key={item.title}
                  align="center"
                  variant="head"
                  className="headerCell"
                  style={{ width: item.width }}
                >
                  <div className="cellContent">{t(item.title)}</div>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listCategory &&
            listCategory.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="bodyCell" align="center">
                  {(pagination.page - 1) * pagination.limit + index + 1}
                </TableCell>
                <TableCell component="th" scope="row" className="bodyCell">
                  {category.title}
                </TableCell>
                <TableCell className="bodyCell">
                  {category.description}
                </TableCell>
                <TableCell className="bodyCell">
                  {category.childs &&
                    category.childs.map((sub) => (
                      <Chip
                        label={sub.title}
                        className="customChip"
                        key={sub.id}
                      />
                    ))}
                </TableCell>
                <TableCell className="bodyCell" align="center">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleOpenMenu(category.id)}
                  >
                    <Icon> more_vert </Icon>
                  </IconButton>
                </TableCell>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={!!selectCategoryId}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={() => onHandleEdit(selectCategoryId)}>
                    <Icon aria-label="edit" className="iconAction">
                      edit
                    </Icon>
                    {t('edit')}
                  </MenuItem>
                  <MenuItem onClick={() => setIsDelete(true)}>
                    <Icon
                      aria-label="delete"
                      color="error"
                      className="iconAction"
                    >
                      delete
                    </Icon>
                    {t('deleteCategory')}
                  </MenuItem>
                </Menu>
              </TableRow>
            ))}
          {isLoading && (
            <TableRow>
              <TableCell>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          handleClose={handleCloseConfirm}
          title={t('titleConfirmDelete')}
          textButton={t('delete')}
          handleConfirm={handleDeleteCategory}
        />
      )}
    </TableStyled>
  );
}
