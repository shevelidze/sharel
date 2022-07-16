import EasyRest from '@shevelidze/easyrest';
import { generatePostsFetcher } from './generatePostsFetcher';
import prisma from '../prisma';

const creator: EasyRest.Creator = async ({ auth, newObject }) => {
  await prisma.posts.create({
    data: {
      content: newObject.content,
      user_id: auth.userId,
    },
  });
};
const deleter: EasyRest.Deleter = async ({ auth, id }) => {
  await prisma.posts.deleteMany({
    where: {
      AND: {
        id: parseInt(id),
        user_id: auth.userId,
      },
    },
  });
};

const my_posts: EasyRest.EntityBlueprint = {
  members: {
    content: EasyRest.string()
      .requiredForCreation()
      .variable()
      .excludedFromLight(),
    creation_timestamp: EasyRest.number().excludedFromLight(),
    likes: EasyRest.number().excludedFromLight(),
    views: EasyRest.number().excludedFromLight(),
  },
  methods: {},
  fetcher: generatePostsFetcher(true),
  creator,
  deleter,
};

export default my_posts;
