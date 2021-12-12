import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn, getIsAdmin } from '../../store/user/selectors';
import { logout } from '../../store/user/slice';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export function Header() {
  const classes = useStyles(styles);
  const history = useHistory();
  const loggedIn = useSelector(isLoggedIn);
  const isAdmin = useSelector(getIsAdmin);
  const dispatch = useDispatch();

  return (
    <>
      <CssBaseline />
      <ElevationScroll>
        <AppBar className={classes.header}>
          <Toolbar>
            <Typography
              onClick={() => history.push('/')}
              variant="h4"
              className={classes.title}
            >
              OwlLib
            </Typography>
            <Button
              className={classes.link}
              component={RouterLink}
              to="/assistant"
            >
              Мультимедійний асистент
            </Button>
            <Button
              className={classes.link}
              component={RouterLink}
              to="/search-page"
            >
              Пошук книг
            </Button>
            <Button className={classes.link} component={RouterLink} to="/libs">
              Бібліотеки
            </Button>
            <Button className={classes.link} component={RouterLink} to="/books">
              Книги
            </Button>
            {loggedIn && (
              <Button className={classes.link} component={RouterLink} to="/orders">
                Замовлення
              </Button>
            )}
            {isAdmin && (
              <>
                <Button
                  className={classes.link}
                  component={RouterLink}
                  to="/users"
                >
                  Користувачі
                </Button>
              </>
            )}
            {loggedIn ? (
              <>
                <Button
                  className={classes.link}
                  onClick={() => dispatch(logout())}
                >
                  Вихід
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={classes.link}
                  component={RouterLink}
                  to="/login"
                >
                  Вхід
                </Button>
                <Button
                  className={classes.link}
                  component={RouterLink}
                  to="/register"
                >
                  Реєстрація
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}

export default Header;
