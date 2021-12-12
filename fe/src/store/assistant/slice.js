import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  started: false,
  isCommandPlayed: false,
  command: 0,
  recordedText: '',
  audioFinished: false,
  audioStarted: false,
  isStartedListening: false,
  isStoppedListening: false,
  selectedBook: '',
};

const { actions, reducer } = createSlice({
  name: 'assistant',
  initialState,
  reducers: {
    startWorking: () => ({ ...initialState, started: true }),
    stopWorking: () => ({ ...initialState, started: false }),
    setRecordedText: (state, { payload }) => ({
      ...state,
      recordedText: payload,
    }),
    setNextCommand: (state) => ({ ...state, isCommandPlayed: true }),
    setAudioFinished: (state) => ({ ...state, audioFinished: true }),
    setAudioStarted: (state) => ({ ...state, audioStarted: true }),
    setStartedListening: (state) => ({ ...state, isStartedListening: true }),
    setStoppedListening: (state) => ({ ...state, isStoppedListening: true }),
    updateCommand: (state, { payload }) => ({
      ...state,
      command: payload,
      isCommandPlayed: false,
      recordedText: '',
      audioFinished: false,
      audioStarted: false,
      isStartedListening: false,
      isStoppedListening: false,
    }),
    setSelectedBook: (state, { payload }) => ({
      ...state,
      selectedBook: payload,
    }),
    startRecording: noop,
  },
});

export { actions, reducer };

export const { setSelectedBook } = actions;
