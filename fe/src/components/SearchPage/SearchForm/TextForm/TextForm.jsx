import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import styles from '../../formStyles'
import useStyles from '../../../../utils/hooks/useStyles'
import { useFormik } from 'formik'
import validationSchema from './validationSchema'
import Search from '@material-ui/icons/Search'
import { useDispatch } from 'react-redux'
import { textSearch } from '../../../../store/breed/slice'

function TextForm() {
  const classes = useStyles(styles)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      dogname: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(textSearch(values))
    },
  })

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <TextField
        className={classes.field}
        fullWidth
        id="dogname"
        name="dogname"
        label="Порода собаки"
        placeholder="Порода собаки"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.dogname && !!formik.errors.dogname} // add custom errors from store
        helperText={formik.touched.dogname && formik.errors.dogname} // add custom errors from store
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={classes.submit}
        color="primary"
        variant="outlined"
        type="submit"
      >
        Пошук
      </Button>
    </form>
  )
}

export default TextForm
