import getBooks from './getOrders.saga';
import makeOrder from './makeOrder.saga'

// eslint-disable-next-line import/no-anonymous-default-export
export default [getBooks, makeOrder];
