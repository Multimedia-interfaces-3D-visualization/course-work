import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from '../slice'
import api from '../../../services/api'
import urls from '../../../services/apiUrl'
import { startLoading, stopLoading } from '../../loading/slice'

function* getBreeds({ payload }) {
  try {
    yield put(startLoading())

    const { status: _, response } = yield call(api.get, urls.breeds)

    yield put(
      actions.setBreeds(
        response.data.map((breed) => {
          breed.photo = `http://127.0.0.1:5432${breed.photo}`
          return breed
        }),
      ),
    )
  } catch (error) {
    console.error(error)
  } finally {
    yield put(stopLoading())
  }
}

export default takeLatest(actions.getBreeds, getBreeds)
