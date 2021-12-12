import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  user: {
    firstName: localStorage.getItem('userFirstName'),
    lastName: localStorage.getItem('userLastName'),
    loggedIn: !!localStorage.getItem('userAuthToken'),
    isAdmin: localStorage.getItem('userIsAdmin') === 'true',
  },
  loginErrors: null,
  registerErrors: null,
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: noop,
    logout: noop,
    register: noop,
    setLoginErrors: (state, { payload }) => ({
      ...state,
      loginErrors: payload,
    }),
    setRegisterErrors: (state, { payload }) => ({
      ...state,
      registerErrors: payload,
    }),
    setUserData: (state, { payload }) => ({
      ...initialState,
      user: { ...payload, loggedIn: true },
    }),
    clearUserData: () => ({
      user: null,
      loginErrors: null,
      registerErrors: null,
    }),
  },
});

export { actions, reducer };

export const {
  login,
  logout,
  register,
  setLoginErrors,
  setUserData,
  clearUserData,
  setRegisterErrors,
} = actions;
