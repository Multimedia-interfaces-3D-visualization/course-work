import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  orders: null,
};

const { actions, reducer } = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrders: noop,
    setOrders: (state, { payload }) => ({ ...initialState, orders: payload }),
    makeOrder: noop,
  },
});

export { actions, reducer };

export const { getOrders, setOrders, makeOrder } = actions;
