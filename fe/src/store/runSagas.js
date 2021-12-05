import { all } from 'redux-saga/effects';

const runSagas = (middleware, sagas = []) => {
  function* rootSaga() {
    yield all(sagas);
  }

  middleware.run(rootSaga);
};

export default runSagas;
