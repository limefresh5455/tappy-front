// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TAPPYBACK } = initSchema(schema);

export {
  TAPPYBACK
};