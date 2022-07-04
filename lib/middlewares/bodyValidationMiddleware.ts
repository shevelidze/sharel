import * as Yup from 'yup';
import Middleware from './Middleware';
import { InvalidRequestBodyApiError } from '../apiErrors';

const bodyValidationMiddleware: Middleware<any, [Yup.AnySchema]> = (
  req,
  res,
  schema
) => {
  try {
    return schema.validateSync(req.body, { abortEarly: false });
  } catch (e) {
    if (e instanceof Yup.ValidationError) {
      new InvalidRequestBodyApiError(e.errors.join(', ')).send(res);
    } else throw e;
  }
};

export default bodyValidationMiddleware;
