import { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import useStyles from '../../utils/hooks/useStyles'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { getNotifications } from '../../store/notifications/selectors'
import { clearNotifications } from '../../store/notifications/slice'

const ImplicitSnackbar = () => {
  const classes = useStyles(styles)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { message, type } = useSelector(getNotifications) || {}

  useEffect(() => {
    if (message && type) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [message, type])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(clearNotifications())
    setOpen(false)
  }
  return (
    <Snackbar
      direction="up"
      open={open}
      autoHideDuration={20000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert className={classes.alert} onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default ImplicitSnackbar
