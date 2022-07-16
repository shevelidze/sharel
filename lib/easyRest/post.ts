import EasyRest from '@shevelidze/easyrest';
import { generatePostsFetcher } from './generatePostsFetcher';
import prisma from '../prisma';

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
    content: EasyRest.string().excludedFromLight(),
    creation_timestamp: EasyRest.number().excludedFromLight(),
    likes: EasyRest.number().excludedFromLight(),
    views: EasyRest.number().excludedFromLight(),
    is_liked: EasyRest.boolean().variable().excludedFromLight(),
  },
  fetcher: generatePostsFetcher(false),
  mutator,
};

export default post;
