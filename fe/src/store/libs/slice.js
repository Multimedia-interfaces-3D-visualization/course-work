import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  libs: null,
};

const { actions, reducer } = createSlice({
  name: 'libs',
  initialState,
  reducers: {
    getLibs: noop,
    setLibs: (state, { payload }) => ({ ...initialState, libs: payload }),
    replyReport: noop,
  },
});

export { actions, reducer };

export const { getLibs, setLibs } = actions;
