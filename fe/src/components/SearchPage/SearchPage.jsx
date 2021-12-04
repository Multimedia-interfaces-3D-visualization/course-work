import styles from './styles'
import useStyles from '../../utils/hooks/useStyles'
import SearchForm from './SearchForm/SearchForm'
import SearchResult from './SearchResult/SearchResult'
import { useState } from 'react'

function SearchPage() {
  const classes = useStyles(styles)
  const [isTextSearch, setIsTextSearch] = useState(false)

  return (
    <div className={classes.page}>
      <h3 className={classes.title}>Собако-Пошук</h3>
      <SearchForm
        setIsTextSearch={setIsTextSearch}
        isTextSearch={isTextSearch}
      />
      <SearchResult isTextSearch={isTextSearch} />
    </div>
  )
}

export default SearchPage
