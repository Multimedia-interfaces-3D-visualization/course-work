import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../components/Home/Main';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import API from '../components/API/API';
import About from '../components/About/About';
import Guide from '../components/Guide/Guide';
import Snackbar from '../components/Snackbar/Snackbar';
import SimpleBackdrop from '../components/SimpleBackdrop/SimpleBackdrop';
import NotFound from '../components/NotFound/NotFound';
import ScrollToTop from './scroll';
import Admin from '../components/Admin/Admin';
import Users from '../components/Users/Users';
import User from '../components/User/User';
import UserEdit from '../components/UserEdit/UserEdit';
import SearchPage from '../components/SearchPage/SearchPage';
import Libraries from '../components/libs/Libraries/Libraries';
import Library from '../components/libs/Library/Library';
import CreateLibrary from '../components/libs/CreateLibrary/CreateLibrary';
import CreateBook from '../components/books/CreateBook/CreateBook';
import Books from '../components/books/Books/Books';
import Book from '../components/books/Book/Book';
import Assistant from '../components/Assistant/Assistant';

const ImplicitExplicitRouter = ({ history }) => (
  <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <Header />
    <Snackbar />
    <ScrollToTop />
    <SimpleBackdrop />
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/books">
        <Books />
      </Route>
      <Route path="/book/:id">
        <Book />
      </Route>
      <Route path="/libs">
        <Libraries />
      </Route>
      <Route path="/create-lib">
        <CreateLibrary />
      </Route>
      <Route path="/create-book">
        <CreateBook />
      </Route>
      <Route path="/lib/:id">
        <Library />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route exact path="/user/:id">
        <User />
      </Route>
      <Route exact path="/user/edit/:id">
        <UserEdit />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/api">
        <API />
      </Route>
      <Route path="/guide">
        <Guide />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/search-page">
        <SearchPage />
      </Route>
      <Route path="/assistant">
        <Assistant />
      </Route>
      <NotFound />
    </Switch>
    <Footer />
  </Router>
);

ImplicitExplicitRouter.propTypes = {
  history: PropTypes.object,
};

export default ImplicitExplicitRouter;
