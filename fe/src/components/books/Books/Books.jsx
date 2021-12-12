import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import { actions, selectors } from '../../../store/books';
import BooksList from '../BooksList/BooksList';
import { selectors as userSelectors } from '../../../store/user';

const Books = () => {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  const rows = useSelector(selectors.getBooks) ?? [];
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  console.log('rows', rows);

  useEffect(() => dispatch(actions.getBooks()), []);

  return (
    <div>
      <div className={classes.header}>
        <h1 style={{ textAlign: 'center', fontSize: 40 }}>Книги</h1>
        {isAdmin && (
          <Button
            className={classes.acceptButton}
            component={RouterLink}
            to={'/create-book'}
            variant="outlined"
          >
            Додати книгу
          </Button>
        )}
      </div>
      <BooksList rows={rows} hideLabel />
    </div>
  );
};

export default Books;
