import { createSelector } from '@reduxjs/toolkit';

const getRoot = (state) => state?.libs;

export const getLibs = createSelector(getRoot, (root) => root?.libs || []);
export const getLibById = (id) =>
  createSelector(getLibs, (libs) => libs.find((lib) => lib.id === id));
export const getLibsNames = createSelector(getLibs, (libs) =>
  libs.map((lib) => lib.name),
);
