import { call, put, takeLatest } from 'redux-saga/effects';
import { login, setLoginErrors, setUserData } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import history from '../../../history';

function* loginSaga({ payload }) {
  try {
    yield put(startLoading());
    const { status, response } = yield call(api.post, urls.login, payload);

    if (status === 404) {
      return yield put(
        setLoginErrors({
          email: 'Некоректна пошта',
          password: 'Некоректний пароль',
        }),
      );
    }

    localStorage.setItem('userAuthToken', response.token);
    localStorage.setItem('userFirstName', response.userData.firstName);
    localStorage.setItem('userLastName', response.userData.lastName);
    localStorage.setItem('userIsAdmin', response.userData.isAdmin);
    localStorage.setItem('id', response.userData.id);

    sessionStorage.setItem('userAuthToken', response.token);

    yield put(setUserData(response.userData));
    history.push('/search-page');
  } catch (error) {
    yield put(setLoginErrors(error));
  } finally {
    yield put(stopLoading());
  }
}

export default takeLatest(login, loginSaga);
