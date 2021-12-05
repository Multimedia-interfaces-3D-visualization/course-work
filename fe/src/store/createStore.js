import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import runSagas from './runSagas';

const devTools = process.env.NODE_ENV !== 'production' && {
  trace: true,
  traceLimit: 25,
};

const defaultMiddlewareConfig = {
  thunk: false,
  serializableCheck: false,
};

const createStoreForModule = (module) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    ...module.middleware,
    ...getDefaultMiddleware(defaultMiddlewareConfig),
    sagaMiddleware,
  ];

  const store = configureStore({
    devTools,
    middleware,
    reducer: module.reducer,
  });

  runSagas(sagaMiddleware, module.sagas);

  return store;
};

export default createStoreForModule;
