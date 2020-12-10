import { PubSub } from 'graphql-subscriptions';

type User = {
  id: number;
  username: string;
};

export type Context = {
  pubsub: PubSub;
  user?: User;
};
export const defaultContext = {
  pubsub: new PubSub(),
  user: { id: 1, username: 'username' },
};
