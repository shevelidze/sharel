import useUser from './useUser';
import useSWR from 'swr';

interface PreparsedResponse extends Response {
  bodyObject: any;
}

export interface useUserArgs {
  method: string;
  path: string;
  body?: any;
}

export default function useUserSWR(args: useUserArgs | null) {
  const [user] = useUser();

  return useSWR(
    user && args && [args.method, args.path, args.body],
    async (method, path, body): Promise<PreparsedResponse> => {
      if (user === null) throw new Error('Failed to fetch. User not found.');
      const response: Response = await (body !== undefined
        ? user.sendJson(path, body, { method })
        : user.fetch(path, { method }));

      return {
        ...response,
        bodyObject: await response.json(),
      };
    }
  );
}
