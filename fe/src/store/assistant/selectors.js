import { createSelector } from '@reduxjs/toolkit';
import { commands } from './commands';

export const getRoot = (state) => state?.assistant;

export const getRecordedText = createSelector(
  getRoot,
  (root) => root?.recordedText,
);

export const getCommand = createSelector(
  getRoot,
  (root) => commands.find((it) => it.id === root?.command),
);
export const getIsCommandPlayed = createSelector(
  getRoot,
  (root) => root.isCommandPlayed,
);

export const getIsStartedWorking = createSelector(
    getRoot,
    (root) => root.started,
  );

export const getIsAudioFinished = createSelector(
    getRoot,
    (root) => root.audioFinished,
  );
