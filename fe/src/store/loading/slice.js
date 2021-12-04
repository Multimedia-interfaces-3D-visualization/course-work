import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    startLoading: () => true,
    stopLoading: () => false,
  },
})

export { actions, reducer }

export const { startLoading, stopLoading } = actions
