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

    if (command.skip) {
      if (
        ['ні', 'нет', 'не', 'нє'].some((t) =>
          recordedText.toLowerCase().includes(t),
        )
      ) {
        return yield put(actions.updateCommand(command.skip));
      }
    }

    if (command.field && recordedText) {
      if (command.field === 'yearRange' && !isNaN(Number(recordedText))) {
        yield put(
          searchActions.setSelected({
            field: command.field,
            value: [Number(recordedText) - 10, Number(recordedText) + 10],
          }),
        );
      } else {
        yield put(
          searchActions.addToSelected({
            field: command.field,
            value: recordedText,
          }),
        );
      }
    }

    if (command.action) {
      yield put(command.action);
    }

    if (command.stop) {
      yield put(actions.stopWorking());
    }

    return yield put(actions.updateCommand(command.next));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
  }
}

export default takeLatest(actions.setNextCommand, setNextCommand);
