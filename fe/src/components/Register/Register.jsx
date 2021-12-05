import { useFormik } from 'formik';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ContactsIcon from '@material-ui/icons/Contacts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MuiAlert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';
import validationSchema from './validationSchema';
import { selectors, actions } from '../../store/user';

const Register = () => {
  const classes = useStyles(styles);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isClosed, close] = useState(false);
  const errors = useSelector(selectors.getRegisterErrors);
  const loggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: ({ passwordConfirmation, ...values }) => {
      dispatch(
        actions.register({
          ...values,
          username: values.email,
          surname: values.lastName,
        }),
      );
    },
  });

  return loggedIn ? (
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
      <h2 className={classes.registerTitle}>Реєстрація</h2>
      <form className={classes.registerForm} onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.firstName}
          fullWidth
          id="firstName"
          name="firstName"
          label="Ім'я"
          placeholder="Введіть ваше ім'я"
          variant="outlined"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={
            errors?.firstName ||
            (formik.touched.firstName && !!formik.errors.firstName)
          } // add custom errors from store
          helperText={
            errors?.firstName ||
            (formik.touched.firstName && formik.errors.firstName)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBoxIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.lastName}
          fullWidth
          id="lastName"
          name="lastName"
          label="Прізвище"
          placeholder="Введіть ваше прізвище"
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={
            errors?.lastName ||
            (formik.touched.lastName && !!formik.errors.lastName)
          } // add custom errors from store
          helperText={
            errors?.lastName ||
            (formik.touched.lastName && formik.errors.lastName)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactsIcon />
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
          fullWidth
          className={classes.passwordField}
          id="password"
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          placeholder="Введіть ваш пароль"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            errors?.password ||
            (formik.touched.password && !!formik.errors.password)
          } // add custom errors from store
          helperText={
            errors?.password ||
            (formik.touched.password && formik.errors.password)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          className={classes.passwordField}
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Повторення паролю"
          type={showConfPassword ? 'text' : 'password'}
          placeholder="Введіть повторно ваш пароль"
          variant="outlined"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={
            errors?.passwordConfirmation ||
            (formik.touched.passwordConfirmation &&
              !!formik.errors.passwordConfirmation)
          } // add custom errors from store
          helperText={
            errors?.passwordConfirmation ||
            (formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EnhancedEncryptionIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          className={classes.checkbox}
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              name="checked"
              color="primary"
            />
          }
          label="Залишатися авторизованим"
        />
        <div className={classes.actions}>
          <Button className={classes.login} component={RouterLink} to="/login">
            Увійти
          </Button>

          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Зареєструватися
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
