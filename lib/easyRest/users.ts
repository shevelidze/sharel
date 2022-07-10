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
    return await prisma.users.findMany({
      select: include,
      where: {
        id: {
          in: parsedIds,
        },
      },
    });
  }
};

const users: EasyRest.EntityBlueprint = {
  members: {
    first_name: EasyRest.string(),
    last_name: EasyRest.string(),
    email: EasyRest.string(),
  },
  methods: {},
  fetcher,
};

export default users;
