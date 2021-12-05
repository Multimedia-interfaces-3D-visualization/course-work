import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';
import DevicesIcon from '@material-ui/icons/Devices';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';

const Footer = () => {
  const classes = useStyles(styles);

  return (
    <footer className={classes.footer}>
      <Link className={classes.link} component={RouterLink} to="/about">
        <InfoIcon className={classes.linkIcon} />
        Про вебсервіс
      </Link>
      <Link className={classes.link} component={RouterLink} to="/guide">
        <DescriptionIcon className={classes.linkIcon} />
        Інструкція
      </Link>
      <Link
        className={classes.link}
        target="_blank"
        href="https://app.swaggerhub.com/apis-docs/FireAndBlood12/ImplicitExplicit/1.0.0"
      >
        <DevicesIcon className={classes.linkIcon} />
        API
      </Link>
    </footer>
  );
};

export default Footer;
