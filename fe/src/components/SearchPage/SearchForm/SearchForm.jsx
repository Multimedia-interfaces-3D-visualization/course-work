import styles from './styles';
import { useFormik } from 'formik';
import useStyles from '../../../utils/hooks/useStyles';
import { useCallback, useEffect, useState } from 'react';
import PictureForm from './PictureForm/PictureForm';
import TextForm from './TextForm/TextForm';
import { useDispatch, useSelector } from 'react-redux';
import { resetBreedInfo } from '../../../store/breed/slice';
import {
  actions as libActions,
  selectors as libSelectors,
} from '../../../store/libs';
import {
  actions as bookActions,
  selectors as bookSelectors,
} from '../../../store/books';
import ManySelect from './ManySelect';
import RangeSlider from './Slider';
import BooksList from '../../books/BooksList/BooksList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InputAdornment from '@material-ui/core/InputAdornment';

function SearchForm(props) {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(libActions.getLibs());
    dispatch(bookActions.getBooks());
  }, []);
  const libNames = useSelector(libSelectors.getLibsNames);
  const authors = useSelector(bookSelectors.getUniqueAuthors);
  const issuers = useSelector(bookSelectors.getUniqueIssuers);
  const bookTypes = useSelector(bookSelectors.getUniqueTypes);
  const keywords = useSelector(bookSelectors.getUniqueKeywords);
  const bookLanguages = useSelector(bookSelectors.getUniqueLanguage);
  const allBooks = useSelector(bookSelectors.getBooks);

  const [books, setBooks] = useState(allBooks);
  const [selectedLibs, setSelectedLibs] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedIssuers, setSelectedIssuers] = useState([]);
  const [selectedBookTypes, setSelectedBookTypes] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedBookLanguages, setSelectedBookLanguages] = useState([]);
  const [yearRange, setYearRange] = useState([1700, 2021]);
  const [searchText, setSearchText] = useState('');

  const selectors = [
    {
      list: libNames,
      label: 'Бібліотеки',
      selected: selectedLibs,
      setSelected: setSelectedLibs,
    },
    {
      list: authors,
      label: 'Автори',
      selected: selectedAuthors,
      setSelected: setSelectedAuthors,
    },
    {
      list: issuers,
      label: 'Видавці',
      selected: selectedIssuers,
      setSelected: setSelectedIssuers,
    },
    {
      list: bookTypes,
      label: 'Тип',
      selected: selectedBookTypes,
      setSelected: setSelectedBookTypes,
    },
    {
      list: keywords,
      label: 'Ключові слова',
      selected: selectedKeywords,
      setSelected: setSelectedKeywords,
    },
    {
      list: bookLanguages,
      label: 'Мови книг',
      selected: selectedBookLanguages,
      setSelected: setSelectedBookLanguages,
    },
  ];

  const filterBooks = () => {
    const found = (arr1, arr2) => arr1.some((r) => arr2.includes(r));
    const fBooks = allBooks.filter(
      (book) =>
        (!searchText || book.name.includes(searchText)) &&
        (!selectedAuthors.length || found(selectedAuthors, book.authors)) &&
        (!selectedKeywords.length || found(selectedKeywords, book.keywords)) &&
        (!selectedIssuers.length || selectedIssuers.includes(book.issuer)) &&
        (!selectedBookTypes.length || selectedBookTypes.includes(book.type)) &&
        (!selectedBookLanguages.length ||
          selectedBookLanguages.includes(book.languageISO)) &&
        book.yearPublished < yearRange[1] &&
        book.yearPublished > yearRange[0],
    );
    setBooks(fBooks);
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.filters}>
        <TextField
          className={classes.name}
          fullWidth
          id="name"
          name="name"
          label="Назва"
          placeholder="Вкажіть назву книги"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MenuBookIcon />
              </InputAdornment>
            ),
          }}
        />
        {selectors.map((select) =>
          select.list?.length ? (
            <ManySelect className={classes.select} {...select} />
          ) : null,
        )}
        <RangeSlider
          min={1700}
          max={2021}
          value={yearRange}
          setValue={setYearRange}
          label="Рік друку"
        />
        <Button
          className={classes.submit}
          color="primary"
          variant="outlined"
          onClick={filterBooks}
        >
          Шукати
        </Button>
      </div>
      <BooksList rows={books} hideLabel />
    </div>
  );
}

export default SearchForm;
