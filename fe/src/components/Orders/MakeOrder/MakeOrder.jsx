import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import { actions as bookActions, selectors as bookSelectors } from '../../../store/books';
import { actions as libActions, selectors as libSelectors } from '../../../store/libs';
import { useFormik } from 'formik';

const MakeOrder = () => {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  const isLoggedIn = useSelector(userSelectors.isLoggedIn);
  const books = useSelector(bookSelectors.getBooks) ?? [];
  const libs = useSelector(libSelectors.getLibs) ?? [];
  const params = useParams();

  useEffect(() => dispatch(actions.getBooks()), []);
  useEffect(() => dispatch(libActions.getLibs()), []);

  const formik = useFormik({
    initialValues: {
      type: '',
      library: ''
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

  const cur_book = books.find(x => x.id.toString() === params.id.toString());
  const libs_available = libs?.filter(x => x?.availableBooks.find(y => y?.toString() === params?.id?.toString()));

  if (libs_available?.length === 0) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontSize: 40 }}>Замовити книжку {cur_book?.name}</h1>
        <p style={{ textAlign: 'center', fontSize: 20 }}>На жаль, дана книжка не доступна в жодній біблотеці.</p>
        <p style={{ textAlign: 'center', fontSize: 20 }}>Спробуйте пізніше</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: 40 }}>Замовити книжку {cur_book?.name}</h1>
      <form style={{ width: "600px", marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }} className={classes.registerForm} onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="type-select-label">Спосіб видачі</InputLabel>
          <Select
            className={classes.firstName}
            labelId="type-select-label"
            id="type"
            name="type"
            label="Спосіб видачі"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <MenuItem value={"self-pickup"}>У біблотеці</MenuItem>
            <MenuItem value={"shipping"}>Адресна доставка</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="library-select-label">Бібліотека</InputLabel>
          <Select
            className={classes.firstName}
            labelId="library-select-label"
            id="library"
            name="library"
            label="Бібліотека"
            value={formik.values.library}
            onChange={formik.handleChange}
          >
            {libs_available.map(z => (
              <MenuItem key={z.id} value={z.id}>{z.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{marginTop: "15px"}} className={classes.actions}>
          {/* <Button className={classes.login} component={RouterLink} to="/users">
            Повернутися
          </Button> */}

          <Button
            style={{ marginLeft: "auto", marginRight: "auto" }}
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Замовити
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MakeOrder;
