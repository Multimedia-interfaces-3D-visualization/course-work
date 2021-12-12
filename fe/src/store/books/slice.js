import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  books: null,
};

const { actions, reducer } = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooks: noop,
    createBook: noop,
    setBooks: (state, { payload }) => ({ ...initialState, books: payload }),
    replyReport: noop,
  },
});

export { actions, reducer };

export const { getBooks, setBooks, createBook } = actions;
