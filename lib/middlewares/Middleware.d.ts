import { NextApiRequest, NextApiResponse } from 'next';

type Middleware<R, A> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ...args: A
) => R | undefined;
export default Middleware;
