import { makeExecutableSchema } from '@graphql-tools/schema';
import { Context } from './context';

const typeDefs = `
  type User {
    id: ID!
    username: String!
  }
  type Message {
    owner: User
    message: String
  }
  type Subscription {
    messages: Message!
  }
  type Mutation {
    chat(message: String!): Message 
  }
  type Query {
    ping: String
  }
  
`;

const NEW_MESSAGE = 'NEW_MESSAGE';
const subscribeMessage = (_root: any, _args: any, context: Context) => {
  return context.pubsub.asyncIterator(NEW_MESSAGE);
};

const resolvers = {
  Subscription: {
    messages: {
      subscribe: subscribeMessage,
      resolve: function (payload: any) {
        return payload;
      },
    },
  },
  Mutation: {
    chat(_: any, { message }: { message: string }, { pubsub, user }: Context) {
      const richMessage = {
        owner: { id: 1, username: user?.username },
        message,
      };
      pubsub.publish(NEW_MESSAGE, richMessage);
      return richMessage;
    },
  },
  Query: {
    ping() {
      return 'pong';
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
