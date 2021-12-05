import { createSelector } from '@reduxjs/toolkit';

const getRoot = (state) => state?.books;

export const getBooks = createSelector(getRoot, (root) => root?.books || []);
export const getBookById = (id) =>
  createSelector(getBooks, (books) => books.find((book) => book.id === id));
