import styles from './styles';
import useStyles from '../../../utils/hooks/useStyles';
import { useCallback } from 'react';
import PictureForm from './PictureForm/PictureForm';
import TextForm from './TextForm/TextForm';
import { useDispatch } from 'react-redux';
import { resetBreedInfo } from '../../../store/breed/slice';

function SearchForm(props) {
  const classes = useStyles(styles);
  const dispatch = useDispatch();

  const setFormState = useCallback(
    (isTextSearch) => {
      props.setIsTextSearch(isTextSearch);
      dispatch(resetBreedInfo());
    },
    [dispatch, props],
  );

  return (
    <div className={classes.formContainer}>
      <div className={classes.formSwitcher}>
        <div
          className={`${classes.formVariant} ${
            !props.isTextSearch ? classes.active : ''
          }`}
          onClick={() => setFormState(false)}
        >
          Шукати за картинкою
        </div>
        <div
          className={`${classes.formVariant} ${
            props.isTextSearch ? classes.active : ''
          }`}
          onClick={() => setFormState(true)}
        >
          Шукати за текстом
        </div>
      </div>

      {props.isTextSearch ? <TextForm /> : <PictureForm />}
    </div>
  );
}

export default SearchForm;
