import EasyRest from '@shevelidze/easyrest';
import { NextApiHandler } from 'next';
import easyRest from '../../lib/easyRest';
import { UserAccessTokenPayload } from '../../lib/generateUserTokensPair';
import { authorizationMiddleware } from '../../lib/middlewares';

const entities: NextApiHandler = async (req, res) => {
  const tokenPayload = authorizationMiddleware(
    req,
    res,
    'access'
  ) as UserAccessTokenPayload;
  if (tokenPayload === undefined) return;

  const query =
    typeof req.query.parameters === 'string'
      ? [req.query.parameters]
      : req.query.parameters;

  try {
    const apiResponse = await easyRest.processQuery(
      query,
      req.method || 'GET',
      req.body,
      tokenPayload
    );
    res.status(apiResponse.code).json(apiResponse.body);
  } catch (e) {
    if (e instanceof EasyRest.errors.EasyRestError)
      [res.status(e.httpCode).json({ message: e.message })];
    else throw e;
  }
};

export default entities;
