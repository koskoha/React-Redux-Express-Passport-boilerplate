import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Import the root reducer
import rootReducer from './reducers/index';

const loggerMiddleware = createLogger();

const initialState = {};
const middleware = [thunk, loggerMiddleware];

// For Redux DevTools in Chrome
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const store = createStore(rootReducer, initialState, enhancer);

export default store;
