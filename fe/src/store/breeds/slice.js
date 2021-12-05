import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  breeds: null,
};

const { actions, reducer } = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    getBreeds: noop,
    setBreeds: (state, { payload }) => ({ ...initialState, breeds: payload }),
  },
});

export { actions, reducer };
