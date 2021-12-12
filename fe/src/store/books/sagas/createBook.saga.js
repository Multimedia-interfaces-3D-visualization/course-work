import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import history from '../../../history';

function* createBook({ payload }) {
  try {
    yield put(startLoading());

    const { status: _, response } = yield call(
      api.post,
      urls.createBook,
      payload,
    );
    console.log('{ status: _, response }', { status: _, response });
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
    history.push('/books');
  }
}

export default takeLatest(actions.createBook, createBook);
