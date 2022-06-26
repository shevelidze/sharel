import { type SingularFetcher } from "./Fetchers";

export default class EntityMember {
  constructor(typeName: string) {
    this.typeName = typeName;
  }

  exludeFromLight(): EntityMember {
    this.isExcludedFromLight = true;
    return this;
  }
  allowMutation(): EntityMember {
    this.isMutable = true;
    return this;
  }
  addFetcher(fetcher: SingularFetcher): EntityMember {
    this.fetcher = fetcher;
    return this;
  }

  fetcher?: SingularFetcher;
  isExcludedFromLight: boolean = false;
  isMutable: boolean = false;
  typeName: string;

}

