import useUser from './useUser';
import useSWR from 'swr';

interface PreparsedResponse extends Response {
  bodyObject: any;
}

export default function useUserSWR([method, path, body]: [
  string,
  string,
  any?
]) {
  const [user] = useUser();

  return useSWR(
    user && [method, path, body],
    async (method, path, body): Promise<PreparsedResponse> => {
      if (user === null) throw new Error('Failed to fetch. User not found.');
      const response: Response = await (body !== undefined
        ? user.sendJson(path, body, { method })
        : user.fetch(path, { method }));

      await new Promise((resolve) => setTimeout(resolve, 5000));

      return {
        ...response,
        bodyObject: await response.json(),
      };
    }
  );
}
