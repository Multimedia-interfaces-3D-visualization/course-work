import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import history from '../../../history';

function* makeOrder({ payload }) {
  try {
    yield put(startLoading());
    console.log('AAAAAA');
    console.log(payload);

    const { status: _, response } = yield call(
      api.post,
      urls.makeOrder,
      payload,
    );
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
    history.push("/orders");
  }
}

export default takeLatest(actions.makeOrder, makeOrder);
