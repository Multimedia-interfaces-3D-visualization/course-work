import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import history from './history';
import store from './store';
import Router from './routes';

const App = () => (
  <StoreProvider store={store}>
    <Router history={history} />
  </StoreProvider>
);

export default App;
