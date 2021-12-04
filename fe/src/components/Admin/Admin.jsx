import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Paper from '@material-ui/core/Paper'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer'
// import TableHead from '@material-ui/core/TableHead'
// import TablePagination from '@material-ui/core/TablePagination'
// import TableRow from '@material-ui/core/TableRow'
// import Button from '@material-ui/core/Button'
// import columns from './columns'
// import useStyles from '../../utils/hooks/useStyles'
// import tableStyles from './tableStyles'
// import { actions, selectors } from '../../store/reports'

// const Admin = () => {
//   const classes = useStyles(tableStyles)
//   const dispatch = useDispatch()
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const rows = useSelector(selectors.getReports) ?? []

//   useEffect(() => dispatch(actions.getReports()), [])

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value)
//     setPage(0)
//   }

//   const onAccept = (id) => () =>
//     dispatch(
//       actions.replyReport({
//         conlusion: 'accept',
//         id,
//       }),
//     )

//   const onReject = (id) => () =>
//     dispatch(
//       actions.replyReport({
//         conclusion: 'reject',
//         id,
//       }),
//     )

//   return (
//     <div>
//       <div style={{ margin: 'auto', fontSize: 40, width: '0' }}>Admin</div>
//       <div>
//         <Paper className={classes.root}>
//           <TableContainer className={classes.container}>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead className={classes.header}>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       align={column.align}
//                       style={{ minWidth: column.minWidth, fontSize: '16px' }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                   <TableCell key="photos" align="center">
//                     Зображення
//                   </TableCell>
//                   <TableCell
//                     key="controls"
//                     align="center"
//                     style={{ minWidth: '150px', fontSize: '16px' }}
//                   >
//                     Управління
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => {
//                     return (
//                       <TableRow
//                         hover
//                         role="checkbox"
//                         tabIndex={-1}
//                         key={row.id}
//                       >
//                         {columns.map((column) => {
//                           const value = row[column.id]
//                           return (
//                             <TableCell key={column.id} align={column.align}>
//                               {column.format
//                                 ? column.format(value, row)
//                                 : value}
//                             </TableCell>
//                           )
//                         })}
//                         {/* change to id */}
//                         <TableCell
//                           className={classes.breedPhotoContainer}
//                           key={`${row.id}-photo`}
//                         >
//                           <img
//                             className={classes.breedPhoto}
//                             src={row.photo}
//                             alt="Breed"
//                           ></img>
//                         </TableCell>
//                         <TableCell key={`${row.id}-controls`} align="center">
//                           <Button
//                             className={classes.acceptButton}
//                             onClick={onAccept(row.id)}
//                             variant="outlined"
//                           >
//                             Прийняти
//                           </Button>

//                           <Button
//                             className={classes.rejectButton}
//                             onClick={onReject(row.id)}
//                             variant="outlined"
//                           >
//                             Відхилити
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     )
//                   })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25, 50]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             labelRowsPerPage="Кількість запитів на сторінку"
//             labelDisplayedRows={({ from, to, count }) =>
//               `${from}-${to} з ${count !== -1 ? count : `більше ніж ${to}`}`
//             }
//             onChangePage={handleChangePage}
//             onChangeRowsPerPage={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </div>
//     </div>
//   )
// }
const Admin = () => null
export default Admin
