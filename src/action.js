export const FETCH_TAGS_REQUESTED = 'FETCH_TAGS_REQUESTED';


export const fetchTags = () => ({
  type: FETCH_TAGS_REQUESTED,
})

export const initialize = () => ({
  type: 'INITIALIZE',
  payload: "超管wyz已经登录",
})

export const SET_TAGS_DATA = 'SET_TAGS_DATA';
export const setTags = (payload) => ({
  type: SET_TAGS_DATA,
  payload,
})
