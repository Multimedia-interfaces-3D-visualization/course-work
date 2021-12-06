import { executeSearch } from '../search/slice';

export const commands = [
  {
    id: 0,
    text: 'Привіт! Почнімо пошук книг!',
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
    text: 'Автора додано до пошуку! Продовжимо',
    next: 4,
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
    text: 'Видавництво додано до пошуку! Продовжимо',
    next: 4,
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
    text: 'Тип книги додано до пошуку! Продовжимо',
    next: 10,
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
    text: 'Ключові слова книги додано до пошуку! Продовжимо',
    next: 13,
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
    text: 'Мова тексту книги додана до пошуку! Продовжимо',
    next: 16,
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
    text: 'Pік друку додано до пошуку! Продовжимо',
    next: 19,
  },
  {
    id: 19,
    text: 'Чудово! Виконати пошук?',
    next: 20,
    action: executeSearch(),
  },
  {
    id: 20,
    text: 'Гарного читання!',
    next: 0,
    stop: true,
  },
];
