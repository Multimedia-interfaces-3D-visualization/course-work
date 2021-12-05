import BookIcon from '@material-ui/icons/Book';

const columns = [
  {
    id: 'name',
    label: `Назва`,
    align: 'center',
    minWidth: 100,
  },
  {
    id: 'authors',
    label: `Автори`,
    minWidth: 150,
    align: 'center',
    format: (authors = []) =>
      authors.length > 1
        ? authors.reduce(
            (res, auth, ind) => `${res}${ind ? ',' : ''} ${auth}`,
            '',
          )
        : authors[0],
  },
  {
    id: 'type',
    label: 'Тип',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'imageURL',
    label: 'Обложка',
    minWidth: 150,
    align: 'center',
    format: (value, row) =>
      value ? (
        <img src={value} alt={row.name} width="50px" height="75px" />
      ) : (
        <BookIcon
          style={{ width: '50px !important', height: '75px !important' }}
        />
      ),
  },
];

export default columns;
