import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import { getRoot } from '../selectors';
import { getSearchResults, getMaxCount } from '../../search/selectors';
import { commands } from '../commands';
import { startLoading, stopLoading } from '../../loading/slice';
import { actions as searchActions } from '../../search';
import history from '../../../history';

function* setNextCommand() {
  try {
    yield put(startLoading());

    const { command, recordedText, selectedBook } = yield select(getRoot);
    const commandObj = commands.find((it) => it.id === command);

    if (commandObj.skip) {
      if (
        ['ні', 'нет', 'не', 'нє'].some((t) =>
          recordedText.toLowerCase().includes(t),
        )
      ) {
        return yield put(actions.updateCommand(commandObj.skip));
      }
    }

    if (commandObj.firstBook) {
      const books = yield select(getSearchResults);
      if (books.length == 1) {
        history.push(`/book/${books[0].id}`);
      }
    }

    if (commandObj.firstOrder) {
      const books = yield select(getSearchResults);
      if (books.length == 1) {
        history.push(`/orders/orderBook/${books[0].id}`);
      }
    }

    if (commandObj.redirect) {
      console.log('selectedBook', selectedBook);
      console.log('commandObj.redirect', commandObj.redirect);
      history.push(`${commandObj.redirect}${selectedBook}`);
    }

    if (commandObj.fail && recordedText) {
      const id = yield select(getMaxCount(recordedText));
      console.log('id', id);

      if (!id) {
        return yield put(actions.updateCommand(commandObj.fail));
      }

      yield put(actions.setSelectedBook(id));
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
            value: recordedText.toLowerCase(),
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
