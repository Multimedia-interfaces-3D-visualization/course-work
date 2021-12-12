import styles from './styles';
import useStyles from '../../utils/hooks/useStyles';
import SearchForm from './SearchForm/SearchForm';
import SearchResult from './SearchResult/SearchResult';
import { useState } from 'react';

function SearchPage() {
  const classes = useStyles(styles);
  const [isTextSearch, setIsTextSearch] = useState(false);

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: 40 }} >Пошук книг</h1>
      <div className={classes.page}>
        <SearchForm
          setIsTextSearch={setIsTextSearch}
          isTextSearch={isTextSearch}
        />
        <SearchResult isTextSearch={isTextSearch} />
      </div>
    </>
  );
}

export default SearchPage;
