import { useFormik } from 'formik';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
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

const Login = () => {
  const classes = useStyles(styles);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isClosed, close] = useState(false);
  const errors = useSelector(selectors.getLoginErrors);
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectors.isLoggedIn);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        actions.login({
          ...values,
          username: values.email,
        }),
      );
    },
  });

  return loggedIn ? (
    <Redirect to="/search-page" />
  ) : (
    <div className={classes.loginContent}>
      {errors && !isClosed && (
        <MuiAlert
          className={classes.alert}
          elevation={6}
          severity="error"
          onClose={() => close(true)}
        >
          Неправильно введені пошта чи пароль!
        </MuiAlert>
      )}
      <h2 className={classes.loginTitle}>Вхід</h2>
      <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
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
          <Button
            className={classes.register}
            component={RouterLink}
            to="/register"
          >
            Зареєструватися
          </Button>

          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Увійти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
