import { Prisma } from '@prisma/client';
import EasyRest from '@shevelidze/easyrest';
import prisma from '../prisma';

export function generatePostsFetcher(my: boolean) {
  const fetcher: EasyRest.Fetcher = async ({ auth, include, ids }) => {
    const where: Prisma.postsWhereInput = {};
    if (ids !== undefined) where.id = { in: ids.map((el) => parseInt(el)) };
    if (my) where.user_id = auth.userId;
    else where.user_id = { not: auth.userId };

    const {
      likes: includeLikes,
      views: includeViews,
      is_liked: includeIsLiked,
      ...select
    } = include;

    const fetchResult: any = await prisma.posts.findMany({
      select: {
        ...select,
        likes:
          includeLikes || includeIsLiked
            ? {
                select: {
                  user_id: true,
                },
              }
            : false,
        views: includeViews
          ? {
              select: {
                user_id: true,
              },
            }
          : false,
      },
      where,
    });

    for (const post of fetchResult) {
      if (includeLikes || includeIsLiked) {
        const likesArray = post.likes;
        delete post.likes;
        if (includeLikes) post.likes = likesArray.length;

        if (includeIsLiked)
          post.is_liked = likesArray
            .map((el: any) => el.user_id)
            .includes(auth.userId);
      }
      if (includeLikes) {
        const viewsArray = post.views;
        delete post.views;
        post.views = viewsArray.length;
      }
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
