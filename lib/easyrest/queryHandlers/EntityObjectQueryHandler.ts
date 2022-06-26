import QueryHandler from './QueryHandler';
import Entity from '../Entity';

export default class EntityObjectQueryHandler implements QueryHandler {
  constructor(id: string, entity: Entity) {
    this.id = id;
    this.entity = entity;
  }
  handleQueryElement(query: string[], httpMethod: string) {
    return {
      code: 200,
    };
  }

  id: string;
  entity: Entity;
}
