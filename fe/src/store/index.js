import { combineReducers } from '@reduxjs/toolkit';

import createStore from './createStore';
import * as loading from './loading';
import * as notifications from './notifications';
import * as user from './user';
import * as users from './users';
import * as libs from './libs';
import * as books from './books';
import * as breed from './breed';
import * as search from './search';

export default createStore({
  reducer: combineReducers({
    loading: loading.reducer,
    notifications: notifications.reducer,
    user: user.reducer,
    users: users.reducer,
    search: search.reducer,
    breed: breed.reducer,
    libs: libs.reducer,
    books: books.reducer,
  }),
  sagas: [
    ...user.sagas,
    ...users.sagas,
    ...libs.sagas,
    ...search.sagas,
    ...breed.sagas,
    ...books.sagas,
  ],
  middleware: [],
});
