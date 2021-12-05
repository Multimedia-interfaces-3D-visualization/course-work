import { createSelector } from '@reduxjs/toolkit';
import { getUniqueSet } from '../../utils/getUniqueSet';

const getRoot = (state) => state?.books;

export const getBooks = createSelector(getRoot, (root) => root?.books || []);
export const getBookById = (id) =>
  createSelector(getBooks, (books) => books.find((book) => book.id === id));

export const getUniqueIssuers = createSelector(getBooks, (books) =>
  getUniqueSet(books, 'issuer'),
);
export const getUniqueTypes = createSelector(getBooks, (books) =>
  getUniqueSet(books, 'type'),
);
export const getUniqueLanguage = createSelector(getBooks, (books) =>
  getUniqueSet(books, 'languageISO'),
);
export const getUniqueAuthors = createSelector(getBooks, (books) =>
  getUniqueSet(books, 'authors', true),
);
export const getUniqueKeywords = createSelector(getBooks, (books) =>
  getUniqueSet(books, 'keywords', true),
);
