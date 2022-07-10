import EasyRest from '@shevelidze/easyrest';
import users from './users';

const easyRest = new EasyRest.Instance({
  users,
});

export default easyRest;
