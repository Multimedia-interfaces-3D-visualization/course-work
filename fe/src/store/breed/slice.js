import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  breed: {
    breedName: '',
    photos: [],
  },
  requestErrors: null,
};

const { actions, reducer } = createSlice({
  name: 'breed',
  initialState,
  reducers: {
    pictureSearch: noop,
    textSearch: noop,
    setBreedName: (state, { payload }) => ({
      ...state,
      breed: { ...state.breed, breedName: payload },
    }),
    setPhotos: (state, { payload }) => ({
      ...state,
      breed: { ...state.breed, photos: payload },
    }),
    resetBreedInfo: () => initialState,
  },
});

export { actions, reducer };

export const {
  pictureSearch,
  textSearch,
  setBreedName,
  setPhotos,
  resetBreedInfo,
} = actions;
