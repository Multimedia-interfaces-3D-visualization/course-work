import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';

const Guide = () => {
  const classes = useStyles(styles);

  return <div className={classes.loginContent}>Інструкція</div>;
};

export default Guide;
