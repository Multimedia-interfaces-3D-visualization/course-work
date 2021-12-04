import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from '../slice'
import api from '../../../services/api'
import urls from '../../../services/apiUrl'
import { startLoading, stopLoading } from '../../loading/slice'

function* getLibs({ payload }) {
  try {
    yield put(startLoading())

    const { status: _, response } = yield call(api.get, urls.libs)

    yield put(actions.setLibs(response?.libraries))
  } catch (error) {
    console.error(error)
  } finally {
    yield put(stopLoading())
  }
}

export default takeLatest(actions.getLibs, getLibs)
