import { createSelector } from '@reduxjs/toolkit';

const getRoot = (state) => state?.orders;

export const getOrders = createSelector(getRoot, (root) => root?.orders || []);

