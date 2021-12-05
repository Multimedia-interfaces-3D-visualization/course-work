import { createSelector } from '@reduxjs/toolkit';

const getRoot = (state) => state.breeds;

export const getBreeds = createSelector(getRoot, (root) => root.breeds);
