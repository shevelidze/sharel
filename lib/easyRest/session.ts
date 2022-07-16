import EasyRest from '@shevelidze/easyrest';
import prisma from '../prisma';

const fetcher: EasyRest.Fetcher = async ({ auth, ids, include }) => {
  const select = Object.assign({}, include);
  delete select.is_current;

  if (include.is_current) select.id = true;

  let prismaFetchResult: any;

  if (ids === undefined)
    prismaFetchResult = await prisma.sessions.findMany({
      where: {
        user_id: auth.userId,
      },
    });
  else {
    const parsedIds = ids.map((el) => parseInt(el));
    prismaFetchResult = await prisma.sessions.findMany({
      where: {
        AND: {
          user_id: auth.userId,
          id: { in: parsedIds },
        },
      },
    });
  }

  for (const session of prismaFetchResult) {
    if (include.is_current) {
      session.is_current = session.id === auth.sessionId;
      if (!include.id) delete session.id;
    }
  }

  return prismaFetchResult;
};

const deleter: EasyRest.Deleter = async (args) => {
  await prisma.sessions.deleteMany({
    where: { AND: { id: parseInt(args.id), user_id: args.auth.userId } },
  });
};

const session: EasyRest.EntityBlueprint = {
  fetcher,
  deleter,
  members: {
    user_agent: EasyRest.string(),
    ip_address: EasyRest.string(),
    authentification_timestamp: EasyRest.number(),
    last_used_timestamp: EasyRest.number(),
    is_current: EasyRest.boolean(),
  },
  methods: {},
};

export default session;
