import QueryHandler from './QueryHandler';
import Entity from '../Entity';
import {
  InvalidEntityIdError,
  NoCreatorFunctionProvidedError,
} from '../errors';
import EntityObjectQueryHandler from './EntityObjectQueryHandler';

export default class EntityQueryHandler implements QueryHandler {
  constructor(entity: Entity, entityQueryHandlers: EntityQueryHandler[]) {
    this.entity = entity;
    this.entityQueryHandlers = entityQueryHandlers;
  }

  async handleQueryElement(query: string[], httpMethod: string, body: any) {
    query.shift();
    if (httpMethod === 'GET' && query.length === 0)
      return {
        code: 200,
        body: await this.entity.fetcher({}),
      };
    else if (httpMethod === 'PUT' && query.length === 0) {
      if (this.entity.creator === undefined)
        throw new NoCreatorFunctionProvidedError(this.entity.name);

      await this.entity.creator(body);

      return { code: 201 };
    } else {
      if (!this.entity.idExistenceChecker(query[0]))
        throw new InvalidEntityIdError(query[0], this.entity.name);

      return new EntityObjectQueryHandler(
        query[0],
        this.entity,
        this.entityQueryHandlers
      );
    }
  }

  entity: Entity;
  entityQueryHandlers: EntityQueryHandler[];
}
