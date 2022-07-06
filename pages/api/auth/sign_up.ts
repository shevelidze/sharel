import * as Yup from 'yup';
import { NextApiHandler } from 'next';
import { bodyValidationMiddleware } from '../../../lib/middlewares';
import prisma from '../../../lib/prisma';
import generateHash from '../../../lib/generateHash';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { InvalidRequestBodyApiError } from '../../../lib/apiErrors';
import generateUserTokensPair from '../../../lib/generateUserTokensPair';

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  password: Yup.string().required(),
  email: Yup.string().email(),
});

const signUp: NextApiHandler = async (req, res) => {
  const body = bodyValidationMiddleware(req, res, schema, ['POST']);
  if (body === undefined) return;

  let id: number;

  try {
    id = (
      await prisma.users.create({
        select: {
          id: true,
        },
        data: {
          email: body.email,
          first_name: body.firstName,
          last_name: body.lastName,
          password_hash: generateHash(body.password),
        },
      })
    ).id;
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === 'P2002' &&
      e?.meta?.target instanceof Array &&
      e.meta.target.includes('email')
    ) {
      new InvalidRequestBodyApiError('The email has already been taken.').send(
        res
      );
      return;
    } else throw e;
  }

  res.json(generateUserTokensPair(id));
};

export default signUp;
