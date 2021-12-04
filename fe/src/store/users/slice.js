import { createSlice } from '@reduxjs/toolkit'
import noop from '../../utils/noop'

const initialState = {
  users: null,
}

const { actions, reducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: noop,
    setUsers: (state, { payload }) => ({ ...initialState, users: payload }),
    replyReport: noop,
  },
})

export { actions, reducer }

export const { getUsers, setUsers } = actions
