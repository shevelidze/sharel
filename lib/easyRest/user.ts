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
    const {
      posts: postsInclude,
      subscribers: subscribersInclude,
      is_subscribed: subscribedInclude,
      ...select
    } = include;
    if (postsInclude)
      (select.posts as any) = {
        select: { id: true },
        orderBy: { creation_timestamp: 'desc' },
      };

    if (subscribersInclude || subscribedInclude) {
      select.subscriptions_subscriptions_user_idTousers = {
        select: {
          subscriber_user_id: true,
        },
      };
    }

    const fetchResult: any = await prisma.users.findMany({
      select,
      where: {
        id: {
          in: parsedIds,
        },
      },
    });

    for (const user of fetchResult) {
      if (subscribersInclude)
        user.subscribers =
          user.subscriptions_subscriptions_user_idTousers.length;

      if (subscribedInclude)
        user.is_subscribed = user.subscriptions_subscriptions_user_idTousers
          .map((el: any) => el.subscriber_user_id)
          .includes(auth.userId);

      delete user.subscriptions_subscriptions_user_idTousers;
    }

    return fetchResult;
  }
};

const mutator: EasyRest.Mutator = async ({ auth, id, mutate }) => {
  const fetchResult = await prisma.subscriptions.findFirst({
    select: {
      user_id: true,
    },
    where: {
      user_id: parseInt(id),
      subscriber_user_id: auth.userId,
    },
  });
  if ((fetchResult !== null) === mutate.is_subscribed) return;

  if (fetchResult === null) {
    await prisma.subscriptions.create({
      data: {
        subscriber_user_id: auth.userId,
        user_id: parseInt(id),
      },
    });
  } else {
    await prisma.subscriptions.deleteMany({
      where: {
        subscriber_user_id: auth.userId,
        user_id: fetchResult.user_id,
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
    is_subscribed: EasyRest.boolean().variable(),
    subscribers: EasyRest.number(),
  },
  fetcher,
  mutator,
};

export default user;
