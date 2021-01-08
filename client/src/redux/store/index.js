import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

// eslint-disable-next-line no-unused-vars
const loggerMiddleware = store => next => action => {
  const result = next(action);
  return result;
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(
  loggerMiddleware,
  thunk
)));

export default store;
