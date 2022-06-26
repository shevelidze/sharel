import type Entity from './Entity';
import {
  InitialQueryHandler,
  EntityQueryHandler,
  QueryHandler,
  ApiResult,
} from './queryHandlers';

export default class EasyRest {
  constructor(entities: Entity[]) {
    this.entities = entities;
    this.intialQueryHandler = new InitialQueryHandler(
      this.entities.map((value) => new EntityQueryHandler(value))
    );
  }
  processQuery(
    query: string[],
    httpMethod: string,
    bodyObject: any
  ): ApiResult {
    let currentQueryHandler = this.intialQueryHandler;

    while (query.length > 0) {
      let handlerResult = currentQueryHandler.handleQueryElement(
        query,
        httpMethod,
        bodyObject
      );
      if (handlerResult instanceof ApiResult) return handlerResult;
      currentQueryHandler = handlerResult;
    }

    return new ApiResult();
  }
  addEntity(entity: Entity) {}

  entities: Entity[];
  intialQueryHandler: QueryHandler;
}
