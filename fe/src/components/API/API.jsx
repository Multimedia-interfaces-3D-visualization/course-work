import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';

const API = () => {
  const classes = useStyles(styles);

  return (
    <div className={classes.loginContent}>
      <iframe
        title="API"
        src="https://app.swaggerhub.com/apis-docs/FireAndBlood12/ImplicitExplicit/1.0.0?access-token=edea4c19-b3f2-40d5-b49b-455d94e21ed1"
      ></iframe>
    </div>
  );
};

export default API;
