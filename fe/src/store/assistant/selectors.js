import { createSelector } from '@reduxjs/toolkit';
import { commands } from './commands';

export const getRoot = (state) => state?.assistant;

export const getRecordedText = createSelector(
  getRoot,
  (root) => root?.recordedText,
);

export const getCommand = createSelector(
  getRoot,
  (root) => commands[root?.command],
);
export const getIsCommandPlayed = createSelector(
  getRoot,
  (root) => root.isCommandPlayed,
);
