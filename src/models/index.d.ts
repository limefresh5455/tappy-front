import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class TappyBack {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TappyBack>);
  static copyOf(source: TappyBack, mutator: (draft: MutableModel<TappyBack>) => MutableModel<TappyBack> | void): TappyBack;
}