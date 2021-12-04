import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  name: 'notifications',
  initialState: {
    message: '',
    type: '',
  },
  reducers: {
    setNotitfication: (state, { payload }) => payload,
    addNotification: (state, { payload }) => [...state, payload],
    setSuccessNotitfication: (state, { payload }) => ({
      type: 'success',
      message: payload,
    }),
    setErrorNotitfication: (state, { payload }) => ({
      type: 'error',
      message: payload,
    }),
    setInfoNotitfication: (state, { payload }) => ({
      type: 'info',
      message: payload,
    }),
    clearNotifications: () => ({}),
  },
})

export { actions, reducer }

export const {
  setNotitfication,
  clearNotifications,
  setSuccessNotitfication,
  setErrorNotitfication,
  setInfoNotitfication,
} = actions
