import { createSelector } from '@reduxjs/toolkit';

export const getRoot = (state) => state?.assistant;

export const getRecordedText = (state) => state?.assistant?.recordedText;
