import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectors as booksSelectors } from '../../books';
import { actions } from '../slice';
import { getRoot } from '../selectors';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';

function* executeSearch() {
  try {
    yield put(startLoading());

    const allBooks = yield select(booksSelectors.getBooks);
    const {
      selectedLibs,
      selectedAuthors,
      selectedIssuers,
      selectedBookTypes,
      selectedKeywords,
      selectedBookLanguages,
      yearRange,
      searchText,
    } = yield select(getRoot);

    const found = (arr1, arr2) => arr1.some((r) => arr2.includes(r));
    const fBooks = allBooks.filter(
      (book) =>
        (!searchText ||
          book.name.toLowerCase().includes(searchText.toLowerCase())) &&
        (!selectedAuthors.length || found(selectedAuthors, book.authors)) &&
        (!selectedKeywords.length || found(selectedKeywords, book.keywords)) &&
        (!selectedIssuers.length || selectedIssuers.includes(book.issuer)) &&
        (!selectedBookTypes.length || selectedBookTypes.includes(book.type)) &&
        (!selectedBookLanguages.length ||
          selectedBookLanguages.includes(book.languageISO)) &&
        book.yearPublished < yearRange[1] &&
        book.yearPublished > yearRange[0],
    );

    yield put(actions.setSearchResult(fBooks));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
  }
}

export default takeLatest(actions.executeSearch, executeSearch);
