import { useFormik } from 'formik';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookIcon from '@material-ui/icons/Book';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import InputAdornment from '@material-ui/core/InputAdornment';

import StoreIcon from '@material-ui/icons/Store';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import StyleIcon from '@material-ui/icons/Style';
import TranslateIcon from '@material-ui/icons/Translate';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../../../utils/hooks/useStyles';
import styles from './styles';
import validationSchema from './validationSchema';
import { selectors, actions } from '../../../store/user';
import { createBook } from '../../../store/books/slice';

const CreateBook = () => {
  const classes = useStyles(styles);
  const [isClosed, close] = useState(false);
  const errors = useSelector(selectors.getRegisterErrors);
  const isAdmin = useSelector(selectors.getIsAdmin);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      ISBN: '',
      authors: '',
      yearPublished: '',
      placePublished: '',
      issuer: '',
      countPages: '10',
      keywords: '',
      languageISO: 'українська',
      type: '',
      imageURL: '',
      abstract: '',
    },
    validationSchema,
    onSubmit: ({ passwordConfirmation, ...values }) => {
      console.log('values', values);
      dispatch(createBook(values));
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
      <h2 className={classes.registerTitle}>Додавання книги</h2>
      <form className={classes.registerForm} onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.firstName}
          fullWidth
          id="name"
          name="name"
          label="Назва"
          placeholder="Вкажіть назву книги"
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
                <MenuBookIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="ISBN"
          name="ISBN"
          label="ISBN"
          placeholder="Вкажіть ISBN"
          variant="outlined"
          value={formik.values.ISBN}
          onChange={formik.handleChange}
          error={errors?.ISBN || (formik.touched.ISBN && !!formik.errors.ISBN)} // add custom errors from store
          helperText={
            errors?.ISBN || (formik.touched.ISBN && formik.errors.ISBN)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BookIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="authors"
          name="authors"
          label="Автори"
          placeholder="Вкажіть авторів"
          variant="outlined"
          value={formik.values.authors}
          onChange={formik.handleChange}
          error={
            errors?.authors ||
            (formik.touched.authors && !!formik.errors.authors)
          } // add custom errors from store
          helperText={
            errors?.authors || (formik.touched.authors && formik.errors.authors)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="yearPublished"
          name="yearPublished"
          label="Рік друку"
          placeholder="Вкажіть рік друку"
          variant="outlined"
          value={formik.values.yearPublished}
          onChange={formik.handleChange}
          error={
            errors?.yearPublished ||
            (formik.touched.yearPublished && !!formik.errors.yearPublished)
          } // add custom errors from store
          helperText={
            errors?.yearPublished ||
            (formik.touched.yearPublished && formik.errors.yearPublished)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="placePublished"
          name="placePublished"
          label="Місто друку"
          placeholder="Вкажіть місто друку"
          variant="outlined"
          value={formik.values.placePublished}
          onChange={formik.handleChange}
          error={
            errors?.placePublished ||
            (formik.touched.placePublished && !!formik.errors.placePublished)
          } // add custom errors from store
          helperText={
            errors?.placePublished ||
            (formik.touched.placePublished && formik.errors.placePublished)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="issuer"
          name="issuer"
          label="Видавець книги"
          placeholder="Вкажіть видавця книги"
          variant="outlined"
          value={formik.values.issuer}
          onChange={formik.handleChange}
          error={
            errors?.issuer || (formik.touched.issuer && !!formik.errors.issuer)
          } // add custom errors from store
          helperText={
            errors?.issuer || (formik.touched.issuer && formik.errors.issuer)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StoreIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="countPages"
          name="countPages"
          label="Кількість сторінок у книзі"
          placeholder="Вкажіть кількість сторінок у книзі"
          variant="outlined"
          value={formik.values.countPages}
          onChange={formik.handleChange}
          error={
            errors?.countPages ||
            (formik.touched.countPages && !!formik.errors.countPages)
          } // add custom errors from store
          helperText={
            errors?.countPages ||
            (formik.touched.countPages && formik.errors.countPages)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FormatListNumberedRtlIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="keywords"
          name="keywords"
          label="Ключові слова книги"
          placeholder="Вкажіть ключові слова книги"
          variant="outlined"
          value={formik.values.keywords}
          onChange={formik.handleChange}
          error={
            errors?.keywords ||
            (formik.touched.keywords && !!formik.errors.keywords)
          } // add custom errors from store
          helperText={
            errors?.keywords ||
            (formik.touched.keywords && formik.errors.keywords)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StyleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="languageISO"
          name="languageISO"
          label="Мова книги"
          placeholder="Вкажіть мову книги"
          variant="outlined"
          value={formik.values.languageISO}
          onChange={formik.handleChange}
          error={
            errors?.languageISO ||
            (formik.touched.languageISO && !!formik.errors.languageISO)
          } // add custom errors from store
          helperText={
            errors?.languageISO ||
            (formik.touched.languageISO && formik.errors.languageISO)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TranslateIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="type"
          name="type"
          label="Тип книги"
          placeholder="Вкажіть тип книги"
          variant="outlined"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={errors?.type || (formik.touched.type && !!formik.errors.type)} // add custom errors from store
          helperText={
            errors?.type || (formik.touched.type && formik.errors.type)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ArtTrackIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.emailField}
          fullWidth
          id="imageURL"
          name="imageURL"
          label="Обложка книги"
          placeholder="Завантажте обложку книги"
          variant="outlined"
          value={formik.values.imageURL}
          onChange={formik.handleChange}
          error={
            errors?.imageURL ||
            (formik.touched.imageURL && !!formik.errors.imageURL)
          } // add custom errors from store
          helperText={
            errors?.imageURL ||
            (formik.touched.imageURL && formik.errors.imageURL)
          } // add custom errors from store
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AspectRatioIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextareaAutosize
          className={classes.emailField}
          id="abstract"
          name="abstract"
          label="Опис"
          placeholder="Опис книги"
          variant="outlined"
          value={formik.values.abstract}
          onChange={formik.handleChange}
          error={
            errors?.abstract ||
            (formik.touched.abstract && !!formik.errors.abstract)
          } // add custom errors from store
          minRows={3}
          style={{ width: '100%' }}
        />
        <div className={classes.actions}>
          <Button className={classes.login} component={RouterLink} to="/books">
            Повернутися
          </Button>

          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Створити книгу
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
