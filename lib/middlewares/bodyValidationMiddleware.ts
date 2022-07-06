import * as Yup from 'yup';
import Middleware from './Middleware';
import {
  InvalidRequestBodyApiError,
  MethodNotAllowedApiError,
} from '../apiErrors';

const bodyValidationMiddleware: Middleware<
  any,
  [Yup.AnySchema, string[] | undefined]
> = (req, res, schema, methods?: string[]) => {
  if (
    methods !== undefined &&
    (req.method === undefined || !methods.includes(req.method))
  ) {
    new MethodNotAllowedApiError(methods).send(res);
    return;
  }
  try {
    return schema.validateSync(req.body, { abortEarly: false });
  } catch (e) {
    if (e instanceof Yup.ValidationError) {
      new InvalidRequestBodyApiError(e.errors.join(', ')).send(res);
    } else throw e;
  }
};

export default bodyValidationMiddleware;
