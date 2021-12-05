import { createSelector } from '@reduxjs/toolkit';

export const getRoot = (state) => state?.search;

export const getSelected = (field) =>
  createSelector(getRoot, (search) => search[field]);
