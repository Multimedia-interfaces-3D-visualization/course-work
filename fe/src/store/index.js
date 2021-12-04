import { combineReducers } from '@reduxjs/toolkit'

import createStore from './createStore'
import * as loading from './loading'
import * as notifications from './notifications'
import * as user from './user'
import * as users from './users'
import * as libs from './libs'
import * as breed from './breed'
import * as breeds from './breeds'

export default createStore({
  reducer: combineReducers({
    loading: loading.reducer,
    notifications: notifications.reducer,
    user: user.reducer,
    users: users.reducer,
    breeds: breeds.reducer,
    breed: breed.reducer,
    libs: libs.reducer,
  }),
  sagas: [
    ...user.sagas,
    ...users.sagas,
    ...libs.sagas,
    ...breeds.sagas,
    ...breed.sagas,
  ],
  middleware: [],
})
