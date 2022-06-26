import Method from './Method';
import EntityMember from './EntityMember';
import { type PluralFetcher } from './Fetchers';

type IdExistenceChecker = (id: string) => boolean;

export default interface Entity {
  name: string;
  methods: Method[];
  members: EntityMember[];
  pluralFetcher: PluralFetcher;
  idExistenceChecker: IdExistenceChecker;
}