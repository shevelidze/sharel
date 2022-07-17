import { Prisma } from '@prisma/client';
import EasyRest from '@shevelidze/easyrest';
import prisma from '../prisma';

export function generatePostsFetcher(my: boolean) {
  const fetcher: EasyRest.Fetcher = async ({ auth, include, ids }) => {
    const where: Prisma.postsWhereInput = {};
    if (ids !== undefined) where.id = { in: ids.map((el) => parseInt(el)) };
    if (my) where.user_id = auth.userId;
    else where.user_id = { not: auth.userId };

    const { is_liked: includeIsLiked, ...select } = include;

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

    fetchResult.sort((a, b) => {
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

      delete post.users;
    }

    if (fetchResult.length === 0 && ids !== undefined)
      throw new EasyRest.errors.InvalidEntityIdError(
        ids.join(', '),
        'my_posts'
      );

    return fetchResult;
  };

  return fetcher;
}
