import { createSelector } from '@reduxjs/toolkit';

export const getRoot = (state) => state.breed;

export const getBreedName = createSelector(
  getRoot,
  (root) => root.breed.breedName,
);

export const getPhotos = createSelector(getRoot, (root) => root.breed.photos);

export const getRequestErrors = createSelector(
  getRoot,
  (root) => root.registerErrors,
);
