import BookIcon from '@material-ui/icons/Book';

function toFormattedString(date, with_time = true) {
  const d_parsed = new Date(date);

  const y = d_parsed.getFullYear();
  const m =
    `${d_parsed.getMonth() + 1 > 9 ? '' : '0'}` + (d_parsed.getMonth() + 1); // getMonth() is zero-based
  const d = `${d_parsed.getDate() > 9 ? '' : '0'}` + d_parsed.getDate();
  const H = `${d_parsed.getHours() > 9 ? '' : '0'}` + d_parsed.getHours();
  const M = `${d_parsed.getMinutes() > 9 ? '' : '0'}` + d_parsed.getMinutes();
  const S = `${d_parsed.getSeconds() > 9 ? '' : '0'}` + d_parsed.getSeconds();
  return with_time ? `${d}.${m}.${y} ${H}:${M}:${S}` : `${d}.${m}.${y}`;
}

const columns = [
  {
    id: 'number',
    label: 'Номер замовлення',
    minWidth: 25,
    align: 'center',
  },
  {
    id: 'type',
    label: 'Спосіб видачі',
    minWidth: 150,
    align: 'center',
    format: (value, row) =>
      value === 'shipping' ? 'Адресна доставка' : 'У бібліотеці',
  },
  {
    id: 'book',
    label: 'Книжка',
    minWidth: 150,
    align: 'center',
    // value ? (
    //   <img src={value} alt={row.name} width="50px" height="75px" />
    // ) : (
    //   <BookIcon
    //     style={{ width: '50px !important', height: '75px !important' }}
    //   />
    // ),
  },
  {
    id: 'libraryOwner',
    label: 'Бібліотека',
    minWidth: 150,
    align: 'center',
    // value ? (
    //   <img src={value} alt={row.name} width="50px" height="75px" />
    // ) : (
    //   <BookIcon
    //     style={{ width: '50px !important', height: '75px !important' }}
    //   />
    // ),
  },
  {
    id: 'dateCreated',
    label: 'Дата створення',
    minWidth: 50,
    align: 'center',
    format: (value, row) => toFormattedString(value),
  },
  {
    id: 'isReadyToTake',
    label: 'Готовність до видачі',
    minWidth: 50,
    align: 'center',
    format: (value, row) => (value === true ? 'Так' : ' Ні'),
  },
  {
    id: 'returnDeadlineDate',
    label: 'Дедлайн повернення',
    minWidth: 50,
    align: 'center',
    format: (value, row) => toFormattedString(value, false),
  },
  {
    id: 'takenDate',
    label: 'Дата отримання',
    minWidth: 50,
    align: 'center',
    format: (value, row) =>
      value ? toFormattedString(value, false) : 'Ще не отримано',
  },
  {
    id: 'broughtDate',
    label: 'Дата повернення',
    minWidth: 50,
    align: 'center',
    format: (value, row) =>
      value ? toFormattedString(value, false) : 'Ще не повернуто',
  },
];

export default columns;
