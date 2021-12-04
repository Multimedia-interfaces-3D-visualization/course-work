import styles from './styles'
import useStyles from '../../../utils/hooks/useStyles'
import FeedbackForm from './FeedbackForm/FeedbackForm'
import { useSelector } from 'react-redux'
import { getBreedName, getPhotos } from '../../../store/breed/selectors'

function SearchResult(props) {
  const classes = useStyles(styles)

  const breedName = useSelector(getBreedName)
  const photos = useSelector(getPhotos)

  return (
    breedName &&
    photos.length && (
      <div className={classes.container}>
        <div className={classes.breedInfo}>
          <span className={classes.breedLabel}>Порода:</span>
          <span className={classes.breedName}>{breedName}</span>

          {!props.isTextSearch && <FeedbackForm />}
        </div>
        <div className={classes.photoList}>
          {photos.map((photo, i) => (
            <img
              className={classes.photoItem}
              key={i}
              alt={`dog ${i + 1}`}
              src={photo}
            />
          ))}
        </div>
      </div>
    )
  )
}

export default SearchResult
