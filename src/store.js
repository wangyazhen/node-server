import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { fetchTags } from './api';


export const initialize = () => ({
  type: 'INITIALIZE',
  payload: "超管wyz已经登录",
})

const SET_TAGS_DATA = 'SET_TAGS_DATA';
const setTags = (payload) => ({
  type: SET_TAGS_DATA,
  payload,
})

// async action
export const fetchData = () => (dispatch) => fetchTags().then(data => dispatch(setTags(data)));

function main(state = { 
  msg: '',
  tags: [],
}, action) {
  switch(action.type) {
    case 'INITIALIZE':
      return Object.assign({}, state, { msg: action.payload });
    case SET_TAGS_DATA:
      return Object.assign({}, state, { tags: action.payload });
    default:  return state;
  }
}

const reducer = combineReducers({
  main,
});

export default (initialState) => createStore(reducer, initialState, applyMiddleware(thunk));
