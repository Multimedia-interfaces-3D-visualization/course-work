import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import { selectors, actions } from '../../../store/libs';
import { useDispatch, useSelector } from 'react-redux';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { selectors as userSelectors } from '../../../store/user';

const displayedValuesLabels = {
  name: 'Назва',
  address: 'Адреса',
  schedule: `Розклад`,
  telephone: 'Телефон',
  email: 'Пошта',
  description: 'Опис',
};
const displayedFields = [
  'name',
  'address',
  'schedule',
  'telephone',
  'email',
  'description',
];

const Field = (value, label, classes) => {
  return value ? (
    <div className={classes.field}>
      <div className={classes.fieldLabel}>{label}</div>
      <div className={classes.fieldValue}>{value}</div>
    </div>
  ) : null;
};

const Library = (props) => {
  const classes = useStyles(styles);
  const params = useParams();
  const dispatch = useDispatch();
  const isAdmin = useSelector(userSelectors.getIsAdmin);

  useEffect(() => dispatch(actions.getLibs()), []);
  const lib = useSelector(selectors.getLibById(params.id));

  return (
    <div className={classes.content}>
      <div className={classes.leftside}>
        <LocalLibraryIcon className={classes.accountPhoto} />
        {isAdmin && (
          <>
            <Button
              className={classes.acceptButton}
              component={RouterLink}
              to={`/lib/edit/${params.id}`}
              variant="outlined"
            >
              Редагувати
            </Button>
            <Button
              className={classes.rejectButton}
              //onClick={}
              variant="outlined"
            >
              Видалити
            </Button>
          </>
        )}
      </div>
      <div className={classes.userData}>
        {lib && (
          <>
            {displayedFields.map((field) =>
              Field(lib[field], displayedValuesLabels[field], classes),
            )}
          </>
        )}
        <div className={classes.abstract}>
          {lib?.description?.length ? lib.description : null}
        </div>
      </div>
    </div>
  );
};

export default Library;
