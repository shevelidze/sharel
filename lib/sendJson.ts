export default function sendJson(
  input: RequestInfo,
  body: any,
  init?: RequestInit,
  fetchFunction?: (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<Response>
) {
  return (fetchFunction || fetch)(input, {
    method: 'POST',
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
