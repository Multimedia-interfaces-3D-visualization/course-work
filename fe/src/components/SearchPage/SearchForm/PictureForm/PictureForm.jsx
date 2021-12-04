import Button from '@material-ui/core/Button'
import formStyles from '../../formStyles'
import useStyles from '../../../../utils/hooks/useStyles'
import { useFormik } from 'formik'
import validationSchema from './validationSchema'
import FileInput from '../../../FileInput/FileInput'
import { useDispatch } from 'react-redux'
import { pictureSearch } from '../../../../store/breed/slice'

function PictureForm() {
  const classes = useStyles(formStyles)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      dogpic: null,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(pictureSearch(values))
    },
  })

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <FileInput
        className={classes.field}
        id="dogpic"
        name="dogpic"
        label="Картинка собаки"
        placeholder="Вставте картинку собаки"
        value={formik.values.email}
        onChange={(e) => {
          formik.handleChange(e)
        }}
        error={formik.touched.dogpic && !!formik.errors.dogpic} // add custom errors from store
        helperText={formik.touched.dogpic && formik.errors.dogpic} // add custom errors from store
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

export default PictureForm
