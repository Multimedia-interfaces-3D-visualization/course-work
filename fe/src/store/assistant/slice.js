import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  started: false,
  recordedText: '',
};

const { actions, reducer } = createSlice({
  name: 'assistant',
  initialState,
  reducers: {
    startWorking: () => ({ started: true }),
    setRecordedText: (state, { payload }) => ({
      ...state,
      recordedText: payload,
    }),
    startRecording: noop,
  },
});

export { actions, reducer };

export const { getLibs, setLibs } = actions;
