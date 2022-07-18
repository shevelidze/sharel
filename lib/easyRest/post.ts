import EasyRest from '@shevelidze/easyrest';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';

const fetcher: EasyRest.Fetcher = async ({ auth, include, ids }) => {
  const where: Prisma.postsWhereInput = {};
  if (ids !== undefined) where.id = { in: ids.map((el) => parseInt(el)) };

  const {
    is_liked: includeIsLiked,
    user: userIncluded,
    ...select
  } = include as any;

  if (userIncluded) {
    delete userIncluded.subscribers;
    delete userIncluded.is_subscribed;
    select.users = {
      select: include.user,
    };
  }

  const fetchResult = await prisma.posts.findMany({
    select: {
      ...select,
      creation_timestamp: true,
      likes:
        include.likes || includeIsLiked
          ? {
              select: {
                user_id: true,
              },
            }
          : false,
      views: {
        select: {
          user_id: true,
        },
      },
      users: {
        select: {
          ...(select.users as any)?.select,
          subscriptions_subscriptions_user_idTousers: {
            select: {
              subscriber_user_id: true,
            },
            where: {
              subscriber_user_id: auth.userId,
            },
          },
        },
      },
    },
    where,
  });

  if (ids === undefined) {
    fetchResult.sort((a: any, b: any) => {
      if (
        a.users.subscriptions_subscriptions_user_idTousers.length !==
        b.users.subscriptions_subscriptions_user_idTousers.length
      ) {
        return (
          a.users.subscriptions_subscriptions_user_idTousers.length -
          b.users.subscriptions_subscriptions_user_idTousers.length
        );
      }

      function calculateInterestFactor(target: any) {
        const secondsInOneDay = 86400;
        return (
          (target.views.length + 1) /
          (((new Date() as any) - (target.creation_timestamp as any)) /
            (1000 * secondsInOneDay))
        );
      }

      return calculateInterestFactor(b) - calculateInterestFactor(a);
    });
  }

  const anyFetchResult: any = fetchResult;

  for (const post of anyFetchResult) {
    if (include.likes || includeIsLiked) {
      const likesArray = post.likes;
      delete post.likes;
      if (include.likes) post.likes = likesArray.length;

      if (includeIsLiked)
        post.is_liked = likesArray
          .map((el: any) => el.user_id)
          .includes(auth.userId);
    }
    if (include.views) {
      const viewsArray = post.views;
      delete post.views;
      post.views = viewsArray.length;
    } else delete post.views;

    if (!include.creation_timestamp) delete post.creation_timestamp;

    if (include.user) {
      post.user = post.users;
      delete post.user.subscriptions_subscriptions_user_idTousers;
    }

    delete post.users;
  }

  if (fetchResult.length === 0 && ids !== undefined)
    throw new EasyRest.errors.InvalidEntityIdError(ids.join(', '), 'my_posts');

  return fetchResult;
};

const creator: EasyRest.Creator = async ({ auth, newObject }) => {
  await prisma.posts.create({
    data: {
      content: newObject.content,
      user_id: auth.userId,
    },
  });
};

const mutator: EasyRest.Mutator = async ({ mutate, auth, id }) => {
  if (mutate.is_liked === undefined) return;

  const fetchResult = await prisma.likes.findFirst({
    select: { id: true },
    where: {
      user_id: auth.userId,
      post_id: parseInt(id),
    },
  });

  if (mutate.is_liked && fetchResult === null) {
    await prisma.likes.create({
      data: {
        post_id: parseInt(id),
        user_id: auth.userId,
      },
    });
  } else if (!mutate.is_liked && fetchResult !== null) {
    await prisma.likes.delete({
      where: {
        id: fetchResult.id,
      },
    });
  }
};

const post: EasyRest.EntityBlueprint = {
  members: {
    content: EasyRest.string().excludedFromLight().requiredForCreation(),
    creation_timestamp: EasyRest.number().excludedFromLight(),
    likes: EasyRest.number().excludedFromLight(),
    views: EasyRest.number().excludedFromLight(),
    is_liked: EasyRest.boolean().variable().excludedFromLight(),
    user: EasyRest.entity('user').excludedFromLight(),
  },
  fetcher,
  mutator,
  creator,
};

export default post;
