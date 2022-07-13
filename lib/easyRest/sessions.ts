import EasyRest from '@shevelidze/easyrest';
import prisma from '../prisma';

function getTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

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
    const parsedIds = ids.map((value) => parseInt(value));
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

    if (session.authentification_timestamp)
      session.authentification_timestamp = getTimestamp(
        session.authentification_timestamp
      );

    if (session.last_used_timestamp)
      session.last_used_timestamp = getTimestamp(session.last_used_timestamp);
  }

  return prismaFetchResult;
};

const sessions: EasyRest.EntityBlueprint = {
  fetcher,
  members: {
    user_agent: EasyRest.string(),
    ip_address: EasyRest.string(),
    authentification_timestamp: EasyRest.number(),
    last_used_timestamp: EasyRest.number(),
    is_current: EasyRest.boolean(),
  },
  methods: {},
};

export default sessions;
