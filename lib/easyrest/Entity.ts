import EntityMethod from './EntityMethod';
import { type EntityMember } from './entityMembers';

type IdExistenceChecker = (id: string) => Promise<boolean>;
type Creator = (properties: { [key: string]: any }) => Promise<void>;
type Fetcher = (args: { ids?: string[]; include?: string[] }) => Promise<any>;
type Mutator = (id: string, mutate: { [key: string]: any }) => Promise<void>;
type Deleter = (id: string) => Promise<void>;

export default interface Entity {
  name: string;
  methods: { [key: string]: EntityMethod };
  members: { [key: string]: EntityMember };
  creator?: Creator;
  fetcher: Fetcher;
  mutator?: Mutator;
  deleter?: Deleter;
  idExistenceChecker: IdExistenceChecker;
}
