import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { SET_TAGS_DATA } from './action';

function main(state = { 
  msg: '',
  tags: [],
}, action) {
  switch(action.type) {
    case 'INITIALIZE':
      return { ...state, msg: action.payload };
    case SET_TAGS_DATA:
      return { ...state, tags: action.payload };
    default:  return state;
  }
}

const reducer = combineReducers({
  main,
});

const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
  return {
    ...createStore(
      reducer,
      initialState, 
      // applyMiddleware(sagaMiddleware),
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run,
    // close = () => store.dispatch(END)
  }
}

