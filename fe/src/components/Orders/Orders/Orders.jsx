import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import { selectors as userSelectors } from '../../../store/user';
import {
  actions as ordersActions,
  selectors as ordersSelectors,
} from '../../../store/orders';

const Orders = () => {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  const isLoggedIn = useSelector(userSelectors.isLoggedIn);
  const orders = useSelector(ordersSelectors.getOrders);

  useEffect(() => dispatch(ordersActions.getOrders()), []);

  console.log(orders);

  if (!isLoggedIn || !isAdmin) {
    return <p>This page can see only logged in users</p>;
  }

  return (
    <div>
      <p>Orders</p>
      {orders.map((x) => (
        <p key={x.id}>
          Order id = {x.id}, book id = {x.book}
        </p>
      ))}
    </div>
  );
};

export default Orders;
