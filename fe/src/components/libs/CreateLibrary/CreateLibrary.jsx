import { useFormik } from 'formik';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ContactsIcon from '@material-ui/icons/Contacts';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import validationSchema from './validationSchema';
import { selectors, actions } from '../../../store/user';
import { createLib } from '../../../store/libs/slice';

const CreateLibrary = () => {
  const classes = useStyles(styles);
  const [isClosed, close] = useState(false);
  const errors = useSelector(selectors.getRegisterErrors);
  const isAdmin = useSelector(selectors.getIsAdmin);
  const dispatch = useDispatch();
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      telephone: '',
      email: '',
      schedule: '',
      description: '',
    },
    validationSchema,
    onSubmit: ({ passwordConfirmation, ...values }) => {
      console.log('values', values);
      dispatch(createLib(values));
    },
  });

  return !isAdmin ? (
    <Redirect to="/search-page" />
  ) : (
    <div className={classes.registerContent}>
      {errors && !isClosed && (
        <MuiAlert
          className={classes.alert}
          elevation={6}
          severity="error"
          onClose={() => close(true)}
        >
          Вказана пошта уже використовується!
        </MuiAlert>
      )}
      <h2 className={classes.registerTitle}>Створення бібліотеки</h2>
      <form className={classes.registerForm} onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.firstName}
          fullWidth
          id="name"
          name="name"
          label="Назва"
          placeholder="Введіть назву бібліотеки"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={errors?.name || (formik.touched.name && !!formik.errors.name)} // add custom errors from store
          helperText={
            errors?.name || (formik.touched.name && formik.errors.name)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalLibraryIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="address"
          name="address"
          label="Адреса"
          placeholder="Введіть адресу"
          variant="outlined"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={
            errors?.address ||
            (formik.touched.address && !!formik.errors.address)
          } // add custom errors from store
          helperText={
            errors?.address || (formik.touched.address && formik.errors.address)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="email"
          name="email"
          label="Пошта"
          placeholder="Введіть вашу пошту"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            errors?.email || (formik.touched.email && !!formik.errors.email)
          } // add custom errors from store
          helperText={
            errors?.email || (formik.touched.email && formik.errors.email)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="telephone"
          name="telephone"
          label="Телефон"
          placeholder="Введіть телефон"
          variant="outlined"
          value={formik.values.telephone}
          onChange={formik.handleChange}
          error={
            errors?.telephone ||
            (formik.touched.telephone && !!formik.errors.telephone)
          } // add custom errors from store
          helperText={
            errors?.telephone ||
            (formik.touched.telephone && formik.errors.telephone)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PermPhoneMsgIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="schedule"
          name="schedule"
          label="Розклад"
          placeholder="Вкажіть розклад бібліотеки"
          variant="outlined"
          value={formik.values.schedule}
          onChange={formik.handleChange}
          error={
            errors?.schedule ||
            (formik.touched.schedule && !!formik.errors.schedule)
          } // add custom errors from store
          helperText={
            errors?.schedule ||
            (formik.touched.schedule && formik.errors.schedule)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextareaAutosize
          className={classes.emailField}
          id="description"
          name="description"
          label="Опис"
          placeholder="Опис бібліотеки"
          variant="outlined"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            errors?.description ||
            (formik.touched.description && !!formik.errors.description)
          } // add custom errors from store
          minRows={3}
          style={{ width: '100%' }}
        />
        <div className={classes.actions}>
          <Button className={classes.login} component={RouterLink} to="/libs">
            Повернутися
          </Button>

          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Створити бібліотеку
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateLibrary;
