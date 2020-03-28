import { createStore, compose, applyMiddleware } from 'redux';
import { save } from "redux-localstorage-simple";
import thunk from 'redux-thunk'

import rootReducer from './reducers/index';


/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const configureStore = preloadedState => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(save({ namespace: "todo-data" }), thunk)
    ),
  )
);

const store = configureStore({});

export default store;
