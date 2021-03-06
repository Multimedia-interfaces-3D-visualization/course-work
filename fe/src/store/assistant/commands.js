import { executeSearch } from '../search/slice';

export const commands = [
  {
    id: 0,
    text: 'Привіт, @@@username@@@! Я — сова, твій мультимедійний асистент. Можу допомогти перейти на сторінку сайту або почати пошук книг.',
    next: 9001,
    needToInterpolate: true
  },
  {
    id: 9001,
    text: 'Що ви хочете зараз зробити?',
    next: 9002,
    fail: 9003,
  },
  {
    id: 9002,
    text: 'Ви сказали: @@@response@@@. Тому я виконую @@@objective@@@',
    needToInterpolate: true,
    next: 9001,
  },
  {
    id: 9003,
    text: 'Ви сказали: @@@response@@@. Проте я не зрозуміла Вас. Повторіть, будь ласка, ще раз.',
    next: 9001,
    needToInterpolate: true
  },
  {
    id: 900,
    text: 'Почнімо пошук книг!',
    next: 1,
  },
  {
    id: 1,
    text: 'Чи бажаєте ви вказати автора?',
    next: 2,
    skip: 4,
  },
  {
    id: 2,
    text: 'Вкажіть, будь ласка, автора',
    next: 3,
    field: 'selectedAuthors',
  },
  {
    id: 3,
    text: 'Автора "@@@response@@@" додано до пошуку! Продовжимо',
    next: 4,
    needToInterpolate: true
  },
  {
    id: 4,
    text: 'Чи бажаєте ви вказати видавництво?',
    next: 5,
    skip: 7,
  },
  {
    id: 5,
    text: 'Вкажіть, будь ласка, видавництво',
    next: 6,
    field: 'selectedIssuers',
  },
  {
    id: 6,
    text: 'Видавництво "@@@response@@@" додано до пошуку! Продовжимо',
    next: 7,
    needToInterpolate: true
  },
  {
    id: 7,
    text: 'Чи бажаєте ви вказати тип книги?',
    next: 8,
    skip: 10,
  },
  {
    id: 8,
    text: 'Вкажіть, будь ласка, тип книги',
    next: 9,
    field: 'selectedBookTypes',
  },
  {
    id: 9,
    text: 'Тип книги "@@@response@@@" додано до пошуку! Продовжимо',
    next: 10,
    needToInterpolate: true
  },
  {
    id: 10,
    text: 'Чи бажаєте ви вказати ключові слова книги?',
    next: 11,
    skip: 13,
  },
  {
    id: 11,
    text: 'Вкажіть, будь ласка, ключові слова книги',
    next: 12,
    field: 'selectedKeywords',
  },
  {
    id: 12,
    text: 'Ключові слова книги "@@@response@@@" додано до пошуку! Продовжимо',
    next: 13,
    needToInterpolate: true
  },
  {
    id: 13,
    text: 'Чи бажаєте ви вказати мову тексту книги?',
    next: 14,
    skip: 16,
  },
  {
    id: 14,
    text: 'Вкажіть, будь ласка, мову тексту книги',
    next: 15,
    field: 'selectedBookLanguages',
  },
  {
    id: 15,
    text: 'Мова тексту книги "@@@response@@@" додана до пошуку! Продовжимо',
    next: 16,
    needToInterpolate: true
  },
  {
    id: 16,
    text: 'Чи бажаєте ви вказати рік друку книги?',
    next: 17,
    skip: 19,
  },
  {
    id: 17,
    text: 'Вкажіть, будь ласка, рік друку книги',
    next: 18,
    field: 'yearRange',
  },
  {
    id: 18,
    text: 'Pік друку книги "@@@response@@@" додано до пошуку! Продовжимо',
    next: 19,
    needToInterpolate: true
  },
  {
    id: 19,
    text: 'Чудово! Починаємо пошук за таким запитом: @@@query@@@!',
    next: 21,
    needToInterpolate: true,
    action: executeSearch(),
  },
  {
    id: 20,
    text: 'Читайте на здоров\'я! Дякуємо, що скористалися мультимедійним асистентом! До нових зустрічей, @@@username@@@!',
    next: 0,
    stop: true,
    needToInterpolate: true,
  },
  {
    id: 21,
    text: 'Бажаєте перейти на сторінку певної книги?',
    next: 22,
    skip: 24,
    firstBook: true,
  },
  {
    id: 22,
    text: 'Вкажіть, будь ласка, назву книги',
    next: 23,
    fail: 1023,
  },
  {
    id: 1023,
    text: 'На жаль, не знайдено жодної книги з назвою "@@@response@@@".',
    next: 11023,
    needToInterpolate: true,
  },
  {
    id: 11023,
    text: 'Бажаєте спробувати обрати книгу ще раз?',
    next: 22,
    skip: 24,
  },
  {
    id: 23,
    text: 'Перехід на сторінку книги "@@@response@@@". Приємного перегляду!',
    redirect: '/book/',
    next: 24,
    needToInterpolate: true,
  },
  {
    id: 24,
    text: 'Бажаєте замовити певну книгу?',
    next: 25,
    skip: 20,
    firstOrder: true,
  },
  {
    id: 25,
    text: 'Вкажіть, будь ласка, назву книги',
    next: 26,
    fail: 1026,
  },
  {
    id: 1026,
    text: 'На жаль, не знайдено жодної книги з назвою "@@@response@@@".',
    next: 11026,
    needToInterpolate: true,
  },
  {
    id: 11026,
    text: 'Бажаєте спробувати обрати книгу ще раз?',
    next: 25,
    skip: 20,
  },
  {
    id: 26,
    text: 'Перехід на сторінку замовлення книги "@@@response@@@". Гарного читання!',
    redirect: '/orders/orderBook/',
    next: 20,
    needToInterpolate: true,
  },
  {
    id: 9999,
    text: 'Ви сказали "@@@response@@@", але я очікувала відповідь "так" або "ні". Повторіть ще раз',
    needToInterpolate: true,
  },
];
