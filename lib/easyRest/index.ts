import EasyRest from '@shevelidze/easyrest';
import users from './users';
import sessions from './sessions';

const easyRest = new EasyRest.Instance({
  users,
  sessions,
});

export default easyRest;
