import { createSelector } from '@reduxjs/toolkit';

const getRoot = (state) => state?.orders;

export const getOrders = createSelector(getRoot, (root) => root?.orders || []);

export const getOrderById = (id) =>
  createSelector(getOrders, (orders) => orders.find((order) => order.id === id));
