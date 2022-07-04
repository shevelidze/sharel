import * as Yup from 'yup';
import { NextApiHandler } from 'next';
import { bodyValidationMiddleware } from '../../../lib/middlewares';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required(),
  email: Yup.string().email(),
});

const signUp: NextApiHandler = (req, res) => {
  const body = bodyValidationMiddleware(req, res, schema);
  if (body === undefined) return;

  res.json(body);
};

export default signUp;
