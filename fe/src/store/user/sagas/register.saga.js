import { call, put, takeLatest } from 'redux-saga/effects';
import { register, setRegisterErrors, setUserData } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import { actions } from '../../user';

function* registerSaga({ payload }) {
  try {
    yield put(startLoading());

    payload.isAdmin = 1;

    const { status, response } = yield call(api.post, urls.register, payload);

    if (status === 404) {
      return yield put(
        setRegisterErrors({
          email: 'Дана пошта уже використовується',
        }),
      );
    }

    yield put(
      actions.login({
        username: payload.username,
        password: payload.password,
      }),
    );
  } catch (error) {
    yield put(setRegisterErrors(error));
  } finally {
    yield put(stopLoading());
  }
}

export default takeLatest(register, registerSaga);
