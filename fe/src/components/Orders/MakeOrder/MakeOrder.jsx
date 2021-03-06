import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import { actions, selectors } from '../../../store/books';
import { selectors as userSelectors } from '../../../store/user';
import { actions as ordersActions } from '../../../store/orders';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactsIcon from '@material-ui/icons/Contacts';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import {
  actions as bookActions,
  selectors as bookSelectors,
} from '../../../store/books';
import {
  actions as libActions,
  selectors as libSelectors,
} from '../../../store/libs';
import { useFormik } from 'formik';

const MakeOrder = () => {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  const isLoggedIn = useSelector(userSelectors.isLoggedIn);
  const books = useSelector(bookSelectors.getBooks) ?? [];
  const libs = useSelector(libSelectors.getLibs) ?? [];
  const params = useParams();
  const history = useHistory();

  useEffect(() => dispatch(actions.getBooks()), []);
  useEffect(() => dispatch(libActions.getLibs()), []);

  const formik = useFormik({
    initialValues: {
      type: '',
      library: '',
    },
    onSubmit: ({ passwordConfirmation, ...values }) => {
      dispatch(
        ordersActions.makeOrder({
          book: params.id,
          libraryOwner: values.library,
          type: values.type,
        }),
      );
    },
  });

  if (!isLoggedIn) {
    return <p>This page can see only logged in users</p>;
  }

  const cur_book = books.find((x) => x.id.toString() === params.id.toString());
  const libs_available = libs?.filter((x) =>
    x?.availableBooks.find((y) => y?.toString() === params?.id?.toString()),
  );

  if (libs_available?.length === 0) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontSize: 40 }}>
          ???????????????? ???????????? {cur_book?.name}
        </h1>
        <p style={{ textAlign: 'center', fontSize: 20 }}>
          ???? ????????, ???????? ???????????? ???? ???????????????? ?? ???????????? ??????????????????.
        </p>
        <p style={{ textAlign: 'center', fontSize: 20 }}>?????????????????? ??????????????</p>
      </div>
    );
  }

  return (
    <div className={classes.registerContent}>
      <h1 style={{ textAlign: 'center', fontSize: 40, marginBottom: '10px' }}>
        ???????????????? ????????????
      </h1>
      <h2
        style={{
          textAlign: 'center',
          lineHeight: '32px',
          fontSize: '25px',
          marginTop: 0,
        }}
      >
        {cur_book?.name}
      </h2>
      <img src={cur_book?.imageURL} alt={cur_book?.name} height="320px" />
      <h3 style={{ textAlign: 'center', marginTop: '30px', marginBottom: 0 }}>
        ?????????????????? ???????????????????? ?????? ????, ???? ???? ???????????? ???????????????? ??????????:
      </h3>
      <form
        style={{
          width: '450px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '20px',
        }}
        className={classes.registerForm}
        onSubmit={formik.handleSubmit}
      >
        <FormControl fullWidth>
          <InputLabel id="type-select-label">???????????? ????????????</InputLabel>
          <Select
            className={classes.firstName}
            labelId="type-select-label"
            id="type"
            name="type"
            label="???????????? ????????????"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <MenuItem value={'self-pickup'}>?? ??????????????????</MenuItem>
            <MenuItem value={'shipping'}>?????????????? ????????????????</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="library-select-label">????????????????????</InputLabel>
          <Select
            className={classes.firstName}
            labelId="library-select-label"
            id="library"
            name="library"
            label="????????????????????"
            value={formik.values.library}
            onChange={formik.handleChange}
          >
            {libs_available.map((z) => (
              <MenuItem key={z.id} value={z.id}>
                {z.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ marginTop: '15px' }} className={classes.actions}>
          {/* <Button className={classes.login} component={RouterLink} to="/users">
            ??????????????????????
          </Button> */}

          <Button
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            ????????????????
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MakeOrder;
