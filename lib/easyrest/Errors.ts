export class EasyRestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidEntityIdError extends EasyRestError {
  constructor(id: string, entityName: string) {
    super(`Failed to find object with ${id} of entity ${entityName}.`)
  }
}

export class InvalidPutUsageError extends EasyRestError {
  constructor() {
    super('It\'s allowed to use PUT method only for creating new objects.');
  }
}

export class EntitiesPrefixMissingError extends EasyRestError {
  constructor() {
    super('\"/entities/\" prefix is missing. Each api request path must start with this prefix.')
  }
}

export class InvalidEntityNameError extends EasyRestError {
  constructor(entityName: string) {
    super(`Failed to find entity ${entityName}`);
  }
}