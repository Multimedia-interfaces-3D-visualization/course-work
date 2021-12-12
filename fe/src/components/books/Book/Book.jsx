import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import { selectors, actions } from '../../../store/books';
import { useDispatch, useSelector } from 'react-redux';
import BookIcon from '@material-ui/icons/Book';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import { selectors as userSelectors } from '../../../store/user';

const displayedValuesLabels = {
  name: 'Назва',
  ISBN: 'ISBN',
  authors: 'Автори',
  yearPublished: 'Рік друку',
  placePublished: 'Місце друку',
  issuer: 'Видавець',
  countPages: 'Кількість сторінок',
  keywords: 'Ключові слова',
  languageISO: 'Мова книги',
  type: 'Тип',
  abstract: 'Опис',
};
const displayedFields = [
  'ISBN',
  'yearPublished',
  'placePublished',
  'issuer',
  'countPages',
  'languageISO',
  'type',
];

const Field = (value, label, classes) => {
  return value ? (
    <div className={classes.field}>
      <div className={classes.fieldLabel}>{label}</div>
      <div className={classes.fieldValue}>{value}</div>
    </div>
  ) : null;
};
const transformList = (authors = []) =>
  authors.length > 1
    ? authors.reduce((res, auth, ind) => `${res}${ind ? ',' : ''} ${auth}`, '')
    : authors[0];

const Book = (props) => {
  const classes = useStyles(styles);
  const params = useParams();
  const dispatch = useDispatch();
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  const isLoggedIn = useSelector(userSelectors.isLoggedIn);

  useEffect(() => dispatch(actions.getBooks()), []);
  const book = useSelector(selectors.getBookById(params.id));

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: 40 }}>Книга {book?.name}</h1>
      <div className={classes.content}>
        <div className={classes.leftside}>
          {book?.imageURL ? (
            <img
              src={book?.imageURL}
              alt={book?.name}
              className={classes.accountPhoto}
            />
          ) : (
            <BookIcon className={classes.accountPhoto} />
          )}
          {isLoggedIn && (
            <Button
              className={classes.acceptButton}
              component={RouterLink}
              to={`/orders/orderBook/${params.id}`}
              variant="contained"
            >
              Замовити
            </Button>
          )}
          {isAdmin && (
            <>
              <Button
                className={classes.acceptButton}
                component={RouterLink}
                to={`/lib/edit/${params.id}`}
                variant="outlined"
              >
                Редагувати
              </Button>
              <Button
                className={classes.rejectButton}
                //onClick={}
                variant="outlined"
              >
                Видалити
              </Button>
            </>
          )}
        </div>
        <div className={classes.userData}>
          {book && (
            <>
              {Field(book.name, displayedValuesLabels.name, classes)}
              {Field(
                transformList(book.authors),
                displayedValuesLabels['authors'],
                classes,
              )}
              <div>
                {book?.keywords?.length
                  ? book?.keywords.map((word) => (
                      <Chip label={word} style={{ margin: '2px' }} />
                    ))
                  : null}
              </div>
              {displayedFields.map((field) =>
                Field(book[field], displayedValuesLabels[field], classes),
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;
