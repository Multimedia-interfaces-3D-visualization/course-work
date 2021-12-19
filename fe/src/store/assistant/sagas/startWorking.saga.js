import { put, select, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import { getRoot } from '../selectors';
import { commands } from '../commands';
import { startLoading, stopLoading } from '../../loading/slice';
import { getUserData } from '../../user/selectors'

function* startWorking() {
  try {

    const { command, recordedText, selectedBook } = yield select(getRoot);
    const commandObj = commands.find((it) => it.id === command);

    const userdata = yield select(getUserData);
    const username = userdata?.firstName ?? "неавторизований користувач";

    if (commandObj.needToInterpolate === true) {
      if (commandObj.id === 0) {
        yield put(actions.setCommandTextInterpolationObject({ username: `, ${username}` }));
      }
    }

  } catch (error) {
    console.error(error);
  }
}



export default takeLatest(actions.startWorking, startWorking);
