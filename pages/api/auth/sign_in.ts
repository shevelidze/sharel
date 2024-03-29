import { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';
import * as Yup from 'yup';
import { bodyValidationMiddleware } from '../../../lib/middlewares';
import generateHash from '../../../lib/generateHash';
import { InvalidRequestBodyApiError } from '../../../lib/apiErrors';
import { createUserSession } from '../../../lib/userSession';
import requestIp from 'request-ip';

const schema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const signIn: NextApiHandler = async (req, res) => {
  const body = bodyValidationMiddleware(req, res, schema, ['POST']);
  if (body === undefined) return;

  const prismaFetchResult = await prisma.users.findFirst({
    select: { id: true },
    where: {
      email: body.email,
      password_hash: generateHash(body.password),
    },
  });

  if (prismaFetchResult === null)
    new InvalidRequestBodyApiError('Wrong email or password.').send(res);
  else {
    res.json(
      await createUserSession(
        prismaFetchResult.id,
        requestIp.getClientIp(req) || undefined,
        req.headers['user-agent']
      )
    );
  }
};

export default signIn;
