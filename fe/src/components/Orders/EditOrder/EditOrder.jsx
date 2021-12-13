import { useFormik } from 'formik';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty';
import EmailIcon from '@material-ui/icons/Email';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ContactsIcon from '@material-ui/icons/Contacts';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../../../utils/hooks/useStyles';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import styles from './styles';
import validationSchema from './validationSchema';
import { selectors, actions } from '../../../store/user';
import { selectors as ordersSelectors, actions as ordersActions } from '../../../store/orders';
import ukLocale from "date-fns/locale/uk";


const EditOrder = () => {
  const classes = useStyles(styles);
  const [isClosed, close] = useState(false);
  const errors = useSelector(selectors.getRegisterErrors);
  const isAdmin = useSelector(selectors.getIsAdmin);
  const dispatch = useDispatch();
  const params = useParams();
  const order = useSelector(ordersSelectors.getOrderById(params.id))

  const formik = useFormik({
    initialValues: {
      isReadyToTake: false,
      takenDate: null,
      returnDeadlineDate: null,
      broughtDate: null
      // name: '',
      // address: '',
      // telephone: '',
      // email: '',
      // schedule: '',
      // description: '',
    },
    validationSchema,
    onSubmit: ({ ...values }) => {
      console.log('values', values);
      // dispatch(createLib(values));
      if (isAdmin) {
        dispatch(ordersActions.updateOrder({
          id: params.id,
          isReadyToTake: values.isReadyToTake,
          takenDate: values.takenDate,
          returnDeadlineDate: values.returnDeadlineDate,
          broughtDate: values.broughtDate
        }))
      }
    },
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    setFieldValue("isReadyToTake", order?.isReadyToTake);
    setFieldValue("takenDate", order?.takenDate ?? null);
    setFieldValue("returnDeadlineDate", order?.returnDeadlineDate ?? null);
    setFieldValue("broughtDate", order?.broughtDate ?? null);
  }, [order, setFieldValue]);

  return (
    <div className={classes.registerContent}>
      {/* {errors && !isClosed && (
        <MuiAlert
          className={classes.alert}
          elevation={6}
          severity="error"
          onClose={() => close(true)}
        >
          Вказана пошта уже використовується!
        </MuiAlert>
      )} */}
      <h2 className={classes.registerTitle}>Оновлення замовлення #{order?.number}</h2>
      <form className={classes.registerForm} onSubmit={formik.handleSubmit}>
        {isAdmin && (
          <>
            <FormControl fullWidth className={classes.firstName}>
              <InputLabel style={{marginLeft: "13px" , marginTop: "-9px", zIndex: 2 }} id="isReadyToTake-label">Статус</InputLabel>
              <Select
                
                // fullWidth
                labelId="isReadyToTake-label"
                id="isReadyToTake"
                name="isReadyToTake"
                value={formik.values.isReadyToTake}
                label="Статус"
                placeholder="Введіть назву бібліотеки"
                variant="outlined"
                onChange={formik.handleChange}
                startAdornment={(
                  <InputAdornment position="start">
                    <HourglassEmpty />
                  </InputAdornment>
                )}
              >
                <MenuItem value={false}>Оброблюється бібліотекою</MenuItem>
                <MenuItem value={true}>Готове для видачі</MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ukLocale}>
              <DateTimePicker
                className={classes.firstName}
                fullWidth
                id="takenDate"
                name="takenDate"
                label="Дата та час здійснення видачі"
                inputVariant="outlined"
                format="dd.MM.yyyy HH:mm"
                value={formik.values.takenDate}
                placeholder="Введіть дату та час здійснення видачі"
                ampm={false}
                clearable={true}
                onChange={value => {
                  setFieldValue("takenDate", value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <DatePicker
                className={classes.firstName}
                fullWidth
                id="returnDeadlineDate"
                name="returnDeadlineDate"
                label="Дедлайн повернення книги"
                inputVariant="outlined"
                format="dd.MM.yyyy"
                value={formik.values.returnDeadlineDate}
                placeholder="Введіть дедлайн повернення книги"
                ampm={false}
                clearable={false}
                onChange={value => {
                  setFieldValue("returnDeadlineDate", value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <DateTimePicker
                className={classes.firstName}
                fullWidth
                id="broughtDate"
                name="broughtDate"
                label="Дата та час повернення книги"
                inputVariant="outlined"
                format="dd.MM.yyyy HH:mm"
                value={formik.values.broughtDate}
                placeholder="Введіть дату та час повернення книги"
                ampm={false}
                clearable={true}
                onChange={value => {
                  setFieldValue("broughtDate", value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider>
          </>
        )}
        {/* <TextField
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
        /> */}
        {/* <TextField
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
        /> */}
        <div className={classes.actions}>
          <Button className={classes.login} component={RouterLink} to="/orders">
            Повернутися
          </Button>

          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Оновити
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
