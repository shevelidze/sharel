import QueryHandler from './QueryHandler';
import EntityQueryHandler from './EntityQueryHandler';
import { EntitiesPrefixMissingError, InvalidEntityNameError } from '../Errors';

export default class InitialQueryHandler implements QueryHandler {
  constructor(entityQueryHandlers: EntityQueryHandler[]) {
    this.entityQueryHandlers = entityQueryHandlers;
  }
  handleQueryElement(query: string[], httpMethod: string) {
    if (query[0] !== 'entities') throw new EntitiesPrefixMissingError();
    query.shift();
    for (const handler of this.entityQueryHandlers) {
      if (handler.entity.name == query[0]) return handler;
    }
    throw new InvalidEntityNameError(query[0]);
  }

  entityQueryHandlers: EntityQueryHandler[];
}
