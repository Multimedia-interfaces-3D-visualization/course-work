import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';
import { selectors, actions } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const displayedValuesLabels = {
  username: 'Пошта',
  firstName: `Ім'я`,
  lastName: 'Прізвище',
  postcode: 'Поштовий код',
  postalAddress: 'Адреса доставки',
};
const displayedFields = [
  'username',
  'firstName',
  'lastName',
  'postcode',
  'postalAddress',
];

const Field = (value, label, classes) => {
  return value ? (
    <div className={classes.field}>
      <div className={classes.fieldLabel}>{label}</div>
      <div className={classes.fieldValue}>{value}</div>
    </div>
  ) : null;
};

const User = (props) => {
  const classes = useStyles(styles);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => dispatch(actions.getUsers()), []);
  const user = useSelector(selectors.getUserById(params.id));

  return (
    <div className={classes.content}>
      <AccountCircleIcon className={classes.accountPhoto} />
      <div className={classes.userData}>
        {user && (
          <>
            {displayedFields.map((field) =>
              Field(user[field], displayedValuesLabels[field], classes),
            )}
            <Button
              className={classes.acceptButton}
              component={RouterLink}
              to={`/user/edit/${params.id}`}
              variant="outlined"
            >
              Редагувати
            </Button>

            {user.role !== 'admin' && (
              <Button
                className={classes.rejectButton}
                //onClick={}
                variant="outlined"
              >
                Видалити
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
