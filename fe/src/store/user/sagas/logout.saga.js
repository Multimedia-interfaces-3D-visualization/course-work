import { put, takeLatest } from 'redux-saga/effects';
import { logout, clearUserData } from '../slice';
import history from '../../../history';

function* logoutSaga() {
  localStorage.clear();
  yield put(clearUserData());
  history.push('/login');
}

export default takeLatest(logout, logoutSaga);
