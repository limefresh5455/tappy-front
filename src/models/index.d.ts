import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class TAPPYBACK {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TAPPYBACK>);
  static copyOf(source: TAPPYBACK, mutator: (draft: MutableModel<TAPPYBACK>) => MutableModel<TAPPYBACK> | void): TAPPYBACK;
}