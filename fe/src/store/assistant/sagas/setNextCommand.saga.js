import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import { getRoot, getRecordedText } from '../selectors';
import { getSearchResults, getMaxCount, getSelected } from '../../search/selectors';
import { commands } from '../commands';
import { startLoading, stopLoading } from '../../loading/slice';
import { actions as searchActions  } from '../../search';
import { getUserData } from '../../user/selectors';
import history from '../../../history';

function* setNextCommand() {
  try {
    yield put(startLoading());

    const { command, recordedText, selectedBook, temp } = yield select(getRoot);
    const commandObj = commands.find((it) => it.id === command);
    
    // NEW COMMANDS -- START
    const userdata = yield select(getUserData);
    const username = userdata?.firstName ?? "неавторизований користувач";

    if (commandObj.needToInterpolate === true || commandObj.field) {
      yield put(actions.setCommandTextInterpolationObject({ response: recordedText, username: username  }));
    }

    if (commandObj.next === 9002) {
      const recodedTextLowCase = recordedText.toString().trim().toLowerCase();

      const isRedirect = ["перейти", "перехід", "відвідати", "переключи" ].some(x => recodedTextLowCase.includes(x));
      const isSearch = ["пошук", "знайти", "шукати", "найти"].some(x => recodedTextLowCase.includes(x));
      const isStop = ["стоп", "зупин", "вийти", "заверш", "припин"].some(x => recodedTextLowCase.includes(x));
      const isRedirectToMainPage = ["головна", "головну", "головної", "головній", "головною"].some(x => recodedTextLowCase.includes(x));
      const isRedirectToLib = ["бібліотек", "бібіліотец" ].some(x => recodedTextLowCase.includes(x));
      const isBook = ["книг", "книз", "книж" ].some(x => recodedTextLowCase.includes(x));
      const isOrder = ["замовлен",  ].some(x => recodedTextLowCase.includes(x));
      const isAuth = [ "вхід", "авториз", "автентиф", "аутентиф", "ввійти", "увійти" ].some(x => recodedTextLowCase.includes(x));
      
      if (isStop && (!isRedirect && !isSearch && !isRedirectToMainPage && !isRedirectToLib && !isBook && !isOrder && !isAuth)) {
        yield put(actions.setCommandTextInterpolationObject({response: recordedText, objective: `завершення роботи. До побачення, ${username}!` }));
        yield put(actions.setSelectedBook("stop"));
        return yield put(actions.updateCommand(commandObj.next));
      }

      if (isRedirect && isRedirectToMainPage && (!isStop && !isSearch && !isRedirectToLib && !isBook && !isOrder && !isAuth)) {
        yield put(actions.setCommandTextInterpolationObject({response: recordedText, objective: "перехід на головну сторінку" }));
        yield put(actions.setSelectedBook("main"));
        return yield put(actions.updateCommand(commandObj.next));
      }

      if (isSearch && isBook && (!isStop && !isRedirect && !isRedirectToLib && !isRedirectToMainPage && !isOrder && !isAuth)) {
        yield put(actions.setCommandTextInterpolationObject({response: recordedText, objective: "підготовку до знаходження книг" }));
        yield put(actions.setSelectedBook("search"));
        return yield put(actions.updateCommand(commandObj.next));
      }

      if (isRedirect && isRedirectToLib && (!isStop && !isSearch && !isRedirectToMainPage && !isBook && !isOrder && !isAuth)) {
        yield put(actions.setCommandTextInterpolationObject({response: recordedText, objective: "перехід на сторінку бібліотек" }));
        yield put(actions.setSelectedBook("lib"));
        return yield put(actions.updateCommand(commandObj.next));
      }

      if (isRedirect && isBook && (!isStop && !isSearch && !isRedirectToMainPage && !isRedirectToLib && !isOrder && !isAuth)) {
        yield put(actions.setCommandTextInterpolationObject({response: recordedText, objective: "перехід на сторінку книжок" }));
        yield put(actions.setSelectedBook("books"));
        return yield put(actions.updateCommand(commandObj.next));
      }

      if (isRedirect && isOrder && (!isStop && !isSearch && !isRedirectToMainPage && !isRedirectToLib && !isBook && !isAuth)) {
        yield put(actions.setCommandTextInterpolationObject({response: recordedText, objective: "перехід на сторінку замовлень" }));
        yield put(actions.setSelectedBook("orders"));
        return yield put(actions.updateCommand(commandObj.next));
      }

      if (isRedirect && isAuth && (!isStop && !isSearch && !isRedirectToMainPage && !isRedirectToLib && !isBook && !isOrder)) {
        yield put(actions.setCommandTextInterpolationObject({response: recordedText, objective: "перехід на сторінку авторизації" }));
        yield put(actions.setSelectedBook("auth"));
        return yield put(actions.updateCommand(commandObj.next));
      }

      yield put(actions.setCommandTextInterpolationObject({ response: recordedText }));
      return yield put(actions.updateCommand(commandObj.fail));
    }

    if (commandObj.id === 9002) {
      if (selectedBook === "stop") {
        yield put(actions.stopWorking());
        return yield put(actions.updateCommand(0));
      } else if (selectedBook === "main") {
        yield history.push(`/`);
        return yield put(actions.updateCommand(commandObj.next));
      } else if (selectedBook === "lib") {
        yield history.push(`/libs`);
        return yield put(actions.updateCommand(commandObj.next));
      } else if (selectedBook === "books") {
        yield history.push(`/books`);
        return yield put(actions.updateCommand(commandObj.next));
      } else if (selectedBook === "orders") {
        yield history.push(`/orders`);
        return yield put(actions.updateCommand(commandObj.next));
      } else if (selectedBook === "auth") {
        yield history.push(`/login`);
        return yield put(actions.updateCommand(commandObj.next));
      } else if (selectedBook === "search") {
        return yield put(actions.updateCommand(900));
      }
    }
    // NEW COMMANDS -- END

    if (commandObj.next === 19 || commandObj.skip === 19) {
      let txt = "";
      const TselectedAuthors = yield select(getSelected("selectedAuthors"));
      const TselectedIssuers = yield select(getSelected("selectedIssuers"));
      const TselectedBookTypes = yield select(getSelected("selectedBookTypes"));
      const TselectedKeywords = yield select(getSelected("selectedKeywords"));
      const TselectedBookLanguages = yield select(getSelected("selectedBookLanguages"));
      const TyearRange = yield select(getSelected("yearRange"));

      if (TselectedAuthors && TselectedAuthors[0] && TselectedAuthors[0]?.trim()?.length > 0) {
        txt = txt + `автор: "${TselectedAuthors[0]}", `;
      }

      if (TselectedIssuers && TselectedIssuers[0] && TselectedIssuers[0]?.trim()?.length > 0) {
        txt = txt + `видавництво: "${TselectedIssuers[0]}", `;
      }

      if (TselectedBookTypes && TselectedBookTypes[0] && TselectedBookTypes[0]?.trim()?.length > 0) {
        txt = txt + `тип книжки: "${TselectedBookTypes[0]}", `;
      }

      if (TselectedKeywords && TselectedKeywords[0] && TselectedKeywords[0]?.trim()?.length > 0) {
        txt = txt + `ключові слова: "${TselectedKeywords[0]}", `;
      }

      if (TselectedBookLanguages && TselectedBookLanguages[0] && TselectedBookLanguages[0]?.trim()?.length > 0) {
        txt = txt + `мова книжки: "${TselectedBookLanguages[0]}", `;
      }

      if (TyearRange && TyearRange[0] && TyearRange[0] !== 1700) {
        txt = txt + `рік видання: "${TyearRange[0]}", `;
      }

      if (txt) {
        txt = txt.substring(0, txt.length - 2);
      } else {
        txt = "шукати все";
      }

      yield put(actions.setCommandTextInterpolationObject({ query: txt  }));
    }


    if (commandObj.skip) {
      console.log("---------> START");
      if (['ні', 'нет', 'не', 'нє'].some((t) => recordedText.toLowerCase().includes(t))) {
        console.log("---------> NO");
        return yield put(actions.updateCommand(commandObj.skip));
      } else if (['так', 'да', 'та', 'ага', 'звичайно', 'аякже'].some((t) => recordedText.toLowerCase().includes(t))) {
        console.log("---------> DA");
      } else {
        console.log("---------> NE PONYAL");
        yield put(actions.setCommandTextInterpolationObject({ response: recordedText }));
        // if (commandObj.id === 1023) {
        //   yield put(actions.setSelectedBook(22));
        // } else if (commandObj.id === 1026) {
        //   yield put(actions.setSelectedBook(25));
        // } else {
          yield put(actions.setTemp(commandObj.id));
        // }
        return yield put(actions.updateCommand(9999));
      }
    }

    if (commandObj.id === 9999) {
      console.log("---------> OP ESHE RAZ");
      return yield put(actions.updateCommand(+temp));
    }


    if (commandObj.firstBook) {
      const books = yield select(getSearchResults);
      if (books.length == 1) {
        history.push(`/book/${books[0].id}`);
        return yield put(actions.updateCommand(24));
      }
    }

    if (commandObj.firstOrder) {
      const books = yield select(getSearchResults);
      if (books.length == 1) {
        history.push(`/orders/orderBook/${books[0].id}`);
        return yield put(actions.updateCommand(20));
      }
    }

    if (commandObj.redirect) {
      console.log('selectedBook', selectedBook);
      console.log('commandObj.redirect', commandObj.redirect);
      history.push(`${commandObj.redirect}${selectedBook}`);
      yield put(actions.setCommandTextInterpolationObject({ response: recordedText }));
      // yield put(actions.updateCommand(commandObj.next));
    }

    if (commandObj.fail && recordedText) {
      const id = yield select(getMaxCount(recordedText));
      console.log('id', id);
      yield put(actions.setCommandTextInterpolationObject({ response: recordedText }));
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
