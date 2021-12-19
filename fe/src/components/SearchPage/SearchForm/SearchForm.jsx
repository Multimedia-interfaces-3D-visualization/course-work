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
import { selectors as assistantSelectors } from '../../../store/assistant';
import ManySelect from './ManySelect';
import RangeSlider from './Slider';
import BooksList from '../../books/BooksList/BooksList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InputAdornment from '@material-ui/core/InputAdornment';
import { selectors as searchSelectors, actions } from '../../../store/search';
import { actions as AssistantActions } from '../../../store/assistant';

import { OwlAssistant } from '../../Assistant/OwlAssistant';
import Assistant from '../../Assistant/Assistant';
import VoiceButton from './VoiceButton';

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
  const IsAudioFinished =
    useSelector(assistantSelectors.getIsAudioFinished) ?? false;
  const IsAudioStarted =
    useSelector(assistantSelectors.getIsAudioStarted) ?? false;
  const IsStartedListening =
    useSelector(assistantSelectors.getIsStartedListening) ?? false;
  const IsStoppedListening =
    useSelector(assistantSelectors.getIsStoppedListening) ?? false;
  const IsStartedWorking =
    useSelector(assistantSelectors.getIsStartedWorking) ?? false;
  const [owl, setOwl] = useState(<OwlAssistant speaking={false} />);

  const {
    selectedLibs,
    selectedAuthors,
    selectedIssuers,
    selectedBookTypes,
    selectedKeywords,
    selectedBookLanguages,
    yearRange,
    searchText,
    searchResult,
  } = useSelector(searchSelectors.getRoot);

  const getHandleChange = (field) => {
    return (value) => {
      console.log('value', value);
      dispatch(
        actions.setSelected({
          value: Array.isArray(value)
            ? [...new Set(value.map((s) => s.toLowerCase()))]
            : value,
          field,
        }),
      );
    };
  };

  const selectors = [
    {
      list: libNames,
      label: 'Бібліотеки',
      selected: selectedLibs,
      setSelected: getHandleChange('selectedLibs'),
    },
    {
      list: authors,
      label: 'Автори',
      selected: selectedAuthors,
      setSelected: getHandleChange('selectedAuthors'),
    },
    {
      list: issuers,
      label: 'Видавці',
      selected: selectedIssuers,
      setSelected: getHandleChange('selectedIssuers'),
    },
    {
      list: bookTypes,
      label: 'Тип',
      selected: selectedBookTypes,
      setSelected: getHandleChange('selectedBookTypes'),
    },
    {
      list: keywords,
      label: 'Ключові слова',
      selected: selectedKeywords,
      setSelected: getHandleChange('selectedKeywords'),
    },
    {
      list: bookLanguages,
      label: 'Мови книг',
      selected: selectedBookLanguages,
      setSelected: getHandleChange('selectedBookLanguages'),
    },
  ];

  useEffect(() => {
    setOwl(<OwlAssistant animation="idle" />);
  }, []);

  useEffect(() => {
    if (IsAudioStarted && !IsAudioFinished) {
      setOwl(<OwlAssistant animation="speaking" />);
    } else if (IsStartedListening && !IsStoppedListening) {
      setOwl(<OwlAssistant animation="listening" />);
    } else if (IsStartedListening && IsStoppedListening) {
      setOwl(<OwlAssistant animation="naklon" />);
    } else if (!IsStartedWorking) {
      setOwl(<OwlAssistant animation="idle" />);
    } else if (IsStartedWorking && !IsAudioStarted && !IsStartedListening) {
      setOwl(<OwlAssistant animation="hello" />);
    }
  }, [
    IsAudioStarted,
    IsAudioFinished,
    IsStartedListening,
    IsStoppedListening,
    IsStartedWorking,
  ]);

  return (
    <>
      <div className={classes.OwlAssistant}>{owl}</div>
      <div style={{ display: 'none' }}>
        <Assistant />
      </div>
      <div
        className={classes.VoiceButton}
        onClick={() => dispatch(AssistantActions.startWorking())}
      >
        <VoiceButton />
      </div>
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
            onChange={(e) =>
              dispatch(
                actions.setSelected({
                  value: e.target.value,
                  field: 'searchText',
                }),
              )
            }
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
            setValue={getHandleChange('yearRange')}
            label="Рік друку"
          />
          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            onClick={() => dispatch(actions.executeSearch())}
          >
            Шукати
          </Button>
          <Button
            className={classes.submit}
            color="primary"
            variant="outlined"
            onClick={() => dispatch(actions.clear())}
          >
            Очистити
          </Button>
        </div>
        {searchResult?.length ? (
          <div style={{ marginLeft: "15px", maxWidth: "1030px"}}>
            <BooksList rows={searchResult} hideLabel />
          </div>
        ) : (
          <div className={classes.nothing}>Нічого не знайдено</div>
        )}
      </div>
    </>
  );
}

export default SearchForm;
