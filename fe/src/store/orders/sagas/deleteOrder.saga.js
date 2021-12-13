import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import { getOrders } from '../slice';

function* deleteOrder({ payload }) {
  try {
    yield put(startLoading());
    const { status: _, response } = yield call(
      api.delete,
      urls.deleteOrder + payload,
    );
    yield put(getOrders());
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
  }
}

export default takeLatest(actions.deleteOrder, deleteOrder);
