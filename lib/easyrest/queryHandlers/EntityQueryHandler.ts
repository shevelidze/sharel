import QueryHandler from './QueryHandler';
import Entity from '../Entity';
import { InvalidPutUsageError, InvalidEntityIdError } from '../Errors';
import EntityObjectQueryHandler from './EntityObjectQueryHandler';

export default class EntityQueryHandler implements QueryHandler {
  constructor(entity: Entity) {
    this.entity = entity;
  }

  handleQueryElement(query: string[], httpMethod: string, body: any) {
    query.shift();
    if (httpMethod === 'GET' && query.length === 0)
      return {
        code: 200,
        body: this.entity.pluralFetcher(),
      };
    else if (httpMethod === 'PUT') {
      if (query.length > 0) throw new InvalidPutUsageError();

      // create object
      return { code: 201 };
    } else if (httpMethod == 'POST' && query.length === 0) {
      // modify object
      return { code: 201 };
    } else {
      if (!this.entity.idExistenceChecker(query[0]))
        throw new InvalidEntityIdError(query[0], this.entity.name);

      return new EntityObjectQueryHandler(query[0], this.entity);
    }
  }

  entity: Entity;
}
