import EasyRest from '@shevelidze/easyrest';
import user from './user';
import session from './session';
import my_post from './my_post';
import post from './post';

const easyRest = new EasyRest.Instance({
  user,
  session,
  my_post,
  post,
});

export default easyRest;
