import getBooks from './getOrders.saga';
import makeOrder from './makeOrder.saga';
import deleteOrder from './deleteOrder.saga';
import updateOrder from './updateOrder.saga';


// eslint-disable-next-line import/no-anonymous-default-export
export default [getBooks, makeOrder, deleteOrder, updateOrder];
