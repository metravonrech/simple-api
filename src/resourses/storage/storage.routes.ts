import { getRoutes } from 'utils/route';

import add from './add';
import get from './get';
import remove from './remove';

export default getRoutes([
  get,
  add,
  remove,
]);