import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import { actions, selectors } from '../../../store/books';
import { selectors as userSelectors } from '../../../store/user';
import { actions as ordersActions } from '../../../store/orders';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';

const MakeOrder = () => {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  const isLoggedIn = useSelector(userSelectors.isLoggedIn);
  const params = useParams();

  useEffect(() => dispatch(actions.getBooks()), []);

  if (!isLoggedIn || !isAdmin) {
    return <p>This page can see only logged in users</p>;
  }

  return (
    <div>
      <p>Make Order</p>
      <Button
        className={classes.acceptButton}
        onClick={() =>
          dispatch(
            ordersActions.makeOrder({
              book: params.id,
              libraryOwner: '61a89e955b02048d1f55fdb4',
              type: 'shipping',
            }),
          )
        }
        variant="outlined"
      >
        Замовити
      </Button>
      <RouterLink to="/orders/">
        <a>All orders</a>
      </RouterLink>
    </div>
  );
};

export default MakeOrder;
