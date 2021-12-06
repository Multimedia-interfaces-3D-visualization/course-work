import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import { getRoot } from '../selectors';
import { commands } from '../commands';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import { actions as searchActions } from '../../search';

function* setNextCommand() {
  try {
    yield put(startLoading());

    const { command, recordedText } = yield select(getRoot);
    const commandObj = commands[command];

    if (commandObj.skip) {
      if (
        ['ні', 'нет', 'не', 'нє'].some((t) =>
          recordedText.toLowerCase().includes(t),
        )
      ) {
        return yield put(actions.updateCommand(commandObj.skip));
      }
    }

    if (commandObj.field && recordedText) {
      if (commandObj.field === 'yearRange' && !isNaN(Number(recordedText))) {
        yield put(
          searchActions.setSelected({
            field: commandObj.field,
            value: [Number(recordedText) - 10, Number(recordedText) + 10],
          }),
        );
      } else {
        yield put(
          searchActions.addToSelected({
            field: commandObj.field,
            value: recordedText,
          }),
        );
      }
    }

    if (commandObj.action) {
      yield put(commandObj.action);
    }

    if (commandObj.stop) {
      yield put(actions.stopWorking());
    }

    return yield put(actions.updateCommand(commandObj.next));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
  }
}

export default takeLatest(actions.setNextCommand, setNextCommand);
