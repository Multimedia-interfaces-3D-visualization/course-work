import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import formStyles from '../../formStyles';
import styles from './styles';
import useStyles from '../../../../utils/hooks/useStyles';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import Search from '@material-ui/icons/Search';

function FeedbackForm() {
  const formClasses = useStyles(formStyles);
  const classes = useStyles(styles);

  const formik = useFormik({
    initialValues: {
      dogpic: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: implement submit logic
    },
  });

  return (
    <form
      className={`${classes.form} ${formClasses.form}`}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        className={formClasses.field}
        fullWidth
        id="dogpic"
        name="dogpic"
        label="Порода собаки"
        placeholder="Вкажіть породу собаки, якщо не згодні з результатами"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && !!formik.errors.email} // add custom errors from store
        helperText={formik.touched.email && formik.errors.email} // add custom errors from store
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={formClasses.submit}
        color="primary"
        variant="outlined"
        type="submit"
      >
        Відправити
      </Button>
    </form>
  );
}

export default FeedbackForm;
