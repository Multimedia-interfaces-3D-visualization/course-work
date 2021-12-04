import { pictureSearch, setBreedName, setPhotos, textSearch } from '../slice'
import { put, takeLatest } from '@redux-saga/core/effects'

const BreedMock = 'BreedMock'
const PhotosMock = new Array(9).fill(
  'https://buffy.mlpforums.com/blog-0480907001424893244.png',
)

function* doPictureSearch({ payload }) {
  // TODO: request from BE with payload
  const response = { breed: BreedMock }

  yield put(textSearch({ dogname: response.breed }))
}

function* doTextSearch({ payload }) {
  if (!payload.dogname) return // TODO: error
  // TODO: request from BE with payload
  const response = { photos: PhotosMock }

  yield put(setBreedName(payload.dogname))
  yield put(setPhotos(response.photos))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(pictureSearch, doPictureSearch),
  takeLatest(textSearch, doTextSearch),
]
