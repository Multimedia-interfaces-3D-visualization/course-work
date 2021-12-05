import React from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { getIsLoading } from '../../store/loading/selectors';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const open = useSelector(getIsLoading);

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress size={80} color="inherit" />
    </Backdrop>
  );
}
