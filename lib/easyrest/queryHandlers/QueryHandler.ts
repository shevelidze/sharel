export class ApiResult {
  code: number = 200;
  body?: any;
}

export default interface QueryHandler {
  handleQueryElement: (
    query: string[],
    httpMethod: string,
    body: any
  ) => QueryHandler | ApiResult;
}
