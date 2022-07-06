import { NextApiHandler } from 'next';
import generateUserTokensPair from '../../../lib/generateUserTokensPair';
import { authorizationMiddleware } from '../../../lib/middlewares';

const refresh: NextApiHandler = (req, res) => {
  const userId = authorizationMiddleware(req, res, 'refresh');
  if (userId === undefined) return;

  res.json(generateUserTokensPair(userId));
};
