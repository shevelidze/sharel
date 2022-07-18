import EasyRest from '@shevelidze/easyrest';
import user from './user';
import session from './session';
import post from './post';

const easyRest = new EasyRest.Instance({
  user,
  session,
  post,
});

console.log(easyRest.entitiesData.entities.post.include);
console.log(easyRest.entitiesData.entities.post.lightInclude);

export default easyRest;
