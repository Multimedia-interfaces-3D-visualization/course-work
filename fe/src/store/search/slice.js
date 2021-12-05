import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  selectedLibs: [],
  selectedAuthors: [],
  selectedIssuers: [],
  selectedBookTypes: [],
  selectedKeywords: [],
  selectedBookLanguages: [],
  yearRange: [1700, 2021],
  searchText: '',
  searchResult: [],
};
const { actions, reducer } = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelected: (state, { payload: { field, value } }) => ({
      ...state,
      [field]: value,
    }),
    executeSearch: noop,
    setSearchResult: (state, { payload }) => ({
      ...state,
      searchResult: payload,
    }),
    clear: () => initialState,
  },
});

export { actions, reducer };

export const { getBooks, setBooks } = actions;
