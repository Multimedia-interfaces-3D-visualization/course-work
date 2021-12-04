import { useFormik } from 'formik'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import HomeIcon from '@material-ui/icons/Home'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import ContactsIcon from '@material-ui/icons/Contacts'
import MuiAlert from '@material-ui/lab/Alert'
import useStyles from '../../utils/hooks/useStyles'
import styles from './styles'
import validationSchema from './validationSchema'
import { selectors, actions } from '../../store/user'

import {
  selectors as usersSelectors,
  actions as usersActions,
} from '../../store/users'

const UserEdit = () => {
  const classes = useStyles(styles)
  const [isClosed, close] = useState(false)
  const errors = useSelector(selectors.getRegisterErrors)
  const isAdmin = useSelector(selectors.getIsAdmin)
  const dispatch = useDispatch()
  const params = useParams()
  useEffect(() => dispatch(usersActions.getUsers()), [])
  const user = useSelector(usersSelectors.getUserById(params.id))

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || user?.surname || '',
      postcode: user?.postcode || '',
      postalAddress: user?.postalAddress || '',
    },
    validationSchema,
    onSubmit: ({ passwordConfirmation, ...values }) => {
      dispatch(
        actions.register({
          ...values,
          username: values.email,
          surname: values.lastName,
        }),
      )
    },
  })

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
      <h2 className={classes.registerTitle}>Редагування Профілю</h2>
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
          className={classes.lastName}
          fullWidth
          id="postalAddress"
          name="postalAddress"
          label="Адреса"
          placeholder="Введіть вашу адресу"
          variant="outlined"
          value={formik.values.postalAddress}
          onChange={formik.handleChange}
          error={
            errors?.postalAddress ||
            (formik.touched.postalAddress && !!formik.errors.postalAddress)
          } // add custom errors from store
          helperText={
            errors?.postalAddress ||
            (formik.touched.postalAddress && formik.errors.postalAddress)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.lastName}
          fullWidth
          id="postcode"
          name="postcode"
          label="Поштовий код"
          placeholder="Введіть ваш поштовий код"
          variant="outlined"
          value={formik.values.postcode}
          onChange={formik.handleChange}
          error={
            errors?.postcode ||
            (formik.touched.postcode && !!formik.errors.postcode)
          } // add custom errors from store
          helperText={
            errors?.postcode ||
            (formik.touched.postcode && formik.errors.postcode)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactMailIcon />
              </InputAdornment>
            ),
          }}
        />

        <div className={classes.actions}>
          <Button className={classes.login} component={RouterLink} to="/users">
            Повернутися
          </Button>

          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Зберегти зміни
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UserEdit
