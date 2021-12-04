import useStyles from '../../utils/hooks/useStyles'
import styles from './styles'

const NotFound = () => {
  const classes = useStyles(styles)

  return <div className={classes.notFoundContent}>Сторінки не знайдено!</div>
}

export default NotFound
