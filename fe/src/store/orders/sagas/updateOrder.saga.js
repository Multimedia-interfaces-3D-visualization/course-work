import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import history from '../../../history';

function* updateOrder({ payload }) {
  try {
    yield put(startLoading());

    const { status: _, response } = yield call(
      api.put,
      urls.deleteOrder + payload.id,
      payload,
    );
    
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
    history.push('/orders');
  }
}

export default takeLatest(actions.updateOrder, updateOrder);
