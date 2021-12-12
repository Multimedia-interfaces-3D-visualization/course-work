import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import columns from './columns';
import useStyles from '../../../utils/hooks/useStyles';
import tableStyles from './tableStyles';
import styles from './styles';
import { selectors as userSelectors } from '../../../store/user';
import { actions as ordersActions, selectors as ordersSelectors } from '../../../store/orders';
import { actions as libActions, selectors as libSelectors } from '../../../store/libs';
import { actions as bookActions, selectors as bookSelectors } from '../../../store/books';
import { actions as usersActions, selectors as usersSelectors } from '../../../store/users';

const Orders = () => {
  const classes = useStyles(tableStyles);
  const dispatch = useDispatch();
  const isAdmin = useSelector(userSelectors.getIsAdmin);
  const isLoggedIn = useSelector(userSelectors.isLoggedIn);
  const orders = useSelector(ordersSelectors.getOrders);
  const libs = useSelector(libSelectors.getLibs) ?? [];
  const books = useSelector(bookSelectors.getBooks) ?? [];
  const users = useSelector(usersSelectors.getUsers) ?? [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  useEffect(() => dispatch(bookActions.getBooks()), []);
  useEffect(() => dispatch(ordersActions.getOrders()), []);
  useEffect(() => dispatch(libActions.getLibs()), []);
  useEffect(() => {
    if (isAdmin) {
      dispatch(usersActions.getUsers());
    }
  }, [isAdmin]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isAdmin && !columns.find(x => x.id === "borrower")) {
      columns.splice(2, 0, {
        id: 'borrower',
        label: 'Читач',
        minWidth: 50,
        align: 'center',
      });
    }
    if (!isAdmin && columns.find(x => x.id === "borrower")) {
      columns.splice(2, 1);
    }
  }, []);


  if (!isLoggedIn) {
    return (
      <p>This page can see only logged in users</p>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: 40 }}>{isAdmin ? 'Усі замовлення в системі' : 'Мої замовлення книжок'}</h1>
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
              {orders
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
                        if (column.id === "libraryOwner") {
                          const cur_lib = libs?.find(x => x.id.toString() === value.toString());
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <RouterLink to={`/lib/${cur_lib?.id}`}>{cur_lib?.name}</RouterLink>
                            </TableCell>
                          );
                        } else if (column.id === "book") {
                          const cur_book = books?.find(x => x.id.toString() === value.toString());
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <RouterLink to={`/book/${cur_book?.id}`}>{cur_book?.name}</RouterLink>
                            </TableCell>
                          );
                        } else if (column.id === "borrower") {
                          const cur_user = users?.find(x => x.id.toString() === value.toString());
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <RouterLink to={`/user/${cur_user?.id}`}>{cur_user?.surname} {cur_user?.firstName} {cur_user?.lastName}</RouterLink>
                            </TableCell>
                          );
                        }

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
                          to={`/book/${row.id}`}
                          variant="outlined"
                        >
                          Переглянути
                        </Button>

                        <Button
                          className={classes.rejectButton}
                          //onClick={}
                          variant="outlined"
                        >
                          Замовити
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Кількість замовлень на сторінку"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} з ${count !== -1 ? count : `більше ніж ${to}`}`
          }
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Orders;
