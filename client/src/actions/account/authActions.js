import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from '../types';
import setAuthTokenInHeader from '../../utils/setAuthTokenInHeader';

const validate = data => dispatch => {
  const { email, name, password, password2 } = data;
  if (email.length === 0) {
    const errMsg = { email: 'Please fill in your email.' };
    dispatch({
      type: GET_ERRORS,
      payload: errMsg,
    });
    return false;
  }
  if (name.length === 0) {
    const errMsg = { name: 'Please fill in your name.' };
    dispatch({
      type: GET_ERRORS,
      payload: errMsg,
    });
    return false;
  }
  if (name.length < 2 || name.length > 30) {
    const errMsg = { name: 'Name must be between 2 and 30 characters.' };
    dispatch({
      type: GET_ERRORS,
      payload: errMsg,
    });
    return false;
  }
  if (password.length === 0) {
    const errMsg = { password: 'Password is required.' };
    dispatch({
      type: GET_ERRORS,
      payload: errMsg,
    });
    return false;
  }
  if (password.length < 6) {
    const errMsg = { password: 'Password must be at least 6 character.' };
    dispatch({
      type: GET_ERRORS,
      payload: errMsg,
    });
    return false;
  }
  if (password2.length === 0) {
    const errMsg = { password2: 'Please type your password again.' };
    dispatch({
      type: GET_ERRORS,
      payload: errMsg,
    });
    return false;
  }
  if (password !== password2) {
    const errMsg = { password2: "The two passwords don't match." };
    dispatch({
      type: GET_ERRORS,
      payload: errMsg,
    });
    return false;
  }
  return true;
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  const isValid = validate(userData)(dispatch);
  if (isValid) {
    delete userData.password2;
    sessionStorage.setItem('unactivatedEmail', userData.email);
    axios({
      method: 'post',
      url: '/register',
      data: userData,
    })
      .then(() => history.push('/employee/list'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// install logged-in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// Login and get the token
export const loginUser = userData => dispatch => {
  axios
    .post('/login', userData)
    .then(res => {
      const { token } = res.data;
      // Save to localStorage
      localStorage.setItem('jwtToken', token);
      // Set to Axios global header
      setAuthTokenInHeader(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// log out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  // Remove auth header from global
  setAuthTokenInHeader(false);
  // Set current user to {} which will set isAuthenticated to false as well
  dispatch(setCurrentUser({}));
};

export const getCurrentUserInfo = () => dispatch => {
  axios
    .get('/current')
    .then(res => {
      dispatch(setCurrentUser(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
    payload: null,
  });
};
