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

    const entityQueryHandlers: EntityQueryHandler[] = [];
    for (const entity of this.entities)
      entityQueryHandlers.push(
        new EntityQueryHandler(entity, entityQueryHandlers)
      );

    this.intialQueryHandler = new InitialQueryHandler(entityQueryHandlers);
  }
  async processQuery(
    query: string[],
    httpMethod: string,
    bodyObject: any
  ): Promise<ApiResult> {
    let currentQueryHandler = this.intialQueryHandler;

    while (query.length > 0) {
      let handlerResult = await currentQueryHandler.handleQueryElement(
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
