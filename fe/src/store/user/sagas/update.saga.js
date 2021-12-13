import { call, put, takeLatest } from 'redux-saga/effects';
import { update } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import { actions } from '../../user';
import history from '../../../history';

function* updateSaga({ payload }) {
  try {
    yield put(startLoading());

    const { status, response } = yield call(api.put, urls.updateHack, payload);


  } catch (error) {
    
  } finally {
    yield put(stopLoading());
    history.push("/user/" + localStorage.getItem('id'));

  }
}

export default takeLatest(update, updateSaga);
