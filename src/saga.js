import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchTags } from './api';
import { setTags } from './action';
import { FETCH_TAGS_REQUESTED } from './action';

function *queryTags () {
  try {    
    const tags = yield call(fetchTags);
    console.log('saga 获取到数据:', tags.length);
    yield put(setTags(tags));
  } catch (error) {
    console.log('saga has error:', error);
  }
}

function *mySaga () {
  yield all([
    takeEvery(FETCH_TAGS_REQUESTED, queryTags),
  ])
}

// export default mySaga;

export default function *rootSaga () {
  yield all([
    mySaga(),

  ]);
};
