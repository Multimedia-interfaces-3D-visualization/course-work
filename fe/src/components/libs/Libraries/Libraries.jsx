import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import columns from './columns';
import useStyles from '../../../utils/hooks/useStyles';
import tableStyles from './tableStyles';
import { actions, selectors } from '../../../store/libs';
import { selectors as userSelectors } from '../../../store/user';

const Libraries = () => {
  const classes = useStyles(tableStyles);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  const rows = useSelector(selectors.getLibs) ?? [];
  console.log('rows', rows);

  useEffect(() => dispatch(actions.getLibs()), []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div className={classes.header}>
        <h1 style={{ textAlign: 'center', fontSize: 40 }}>Бібліотеки</h1>
        {isAdmin && (
          <Button
            className={classes.acceptButton}
            component={RouterLink}
            to={'/create-lib'}
            variant="outlined"
          >
            Додати Бібліотеку
          </Button>
        )}
      </div>
      <div>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className={classes.header}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontSize: '16px' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    key="controls"
                    align="center"
                    style={{ minWidth: '150px', fontSize: '16px' }}
                  >
                    Управління
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format
                                ? column.format(value, row)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell key={`${row.id}-controls`} align="center">
                          <Button
                            className={classes.acceptButton}
                            component={RouterLink}
                            to={`/lib/${row.id}`}
                            variant="outlined"
                          >
                            Переглянути
                          </Button>

                          <Button
                            className={classes.rejectButton}
                            //onClick={}
                            variant="outlined"
                          >
                            Видалити
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Кількість бібліотек на сторінку"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} з ${count !== -1 ? count : `більше ніж ${to}`}`
            }
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Libraries;
