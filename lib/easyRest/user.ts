import EasyRest from '@shevelidze/easyrest';
import prisma from '../prisma';

const fetcher: EasyRest.Fetcher = async ({ ids, include, auth }) => {
  const userSelect = {
    email: true,
    first_name: true,
    last_name: true,
    id: true,
  };
  if (ids === undefined) {
    return await prisma.users.findMany({
      select: userSelect,
    });
  } else {
    const parsedIds = ids.map((el) => {
      if (el === 'me') return auth.userId as number;
      const parsed = parseInt(el);
      if (parsed === NaN)
        throw new EasyRest.errors.InvalidEntityIdError(el, 'users');
      return parsed;
    });
    const { posts, ...select } = include;
    if (posts)
      (select.posts as any) = {
        select: { id: true },
        orderBy: { creation_timestamp: 'desc' },
      };
    return await prisma.users.findMany({
      select,
      where: {
        id: {
          in: parsedIds,
        },
      },
    });
  }
};

const user: EasyRest.EntityBlueprint = {
  members: {
    first_name: EasyRest.string().excludedFromLight(),
    last_name: EasyRest.string().excludedFromLight(),
    email: EasyRest.string(),
    posts: EasyRest.array(EasyRest.entity('post'))
      .lightElements()
      .excludedFromLight(),
  },
  fetcher,
};

export default user;
