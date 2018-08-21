import { createStore, combineReducers } from 'redux';


export const initialize = () => ({
  type: 'INITIALIZE',
  payload: "超管wyz已经登录",
})

function main(state = { msg: '' }, action) {
  switch(action.type) {
    case 'INITIALIZE':
      return Object.assign({}, state, { msg: action.payload });
    default:  return state;
  }
}

const reducer = combineReducers({
  main,
});

export default (initialState) => createStore(reducer, initialState);
