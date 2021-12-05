import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import { actions, selectors } from '../../../store/books';
import BooksList from '../BooksList/BooksList';

const Books = () => {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  const rows = useSelector(selectors.getBooks) ?? [];
  console.log('rows', rows);

  useEffect(() => dispatch(actions.getBooks()), []);

  return (
    <div>
      <BooksList rows={rows} />
    </div>
  );
};

export default Books;
