import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { setCurrentUser, logoutUser } from './actions/account/authActions';
import setAuthTokenInHeader from './utils/setAuthTokenInHeader';
import App from './components/App';
import store from './store';
import { API_BASE_URL } from './config';

// Set base URL in request
axios.defaults.baseURL = API_BASE_URL;
// Check the token
if (localStorage.jwtToken) {
  // Set token header in Axios
  setAuthTokenInHeader(localStorage.jwtToken);
  // Set baseURL in header
  const user = jwtDecode(localStorage.jwtToken);
  // Install user into store
  store.dispatch(setCurrentUser(user));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
