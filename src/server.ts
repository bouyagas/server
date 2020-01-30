import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { serverConfig } from './serverConfig';
import { connect } from './serverConfig/db';

import { resolvers, typeDefs } from './type/root';

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

(async () => {
  const server = new ApolloServer({
    context: ({ req }) => ({ req }),
    engine: {
      apiKey: 'service:cool:ix-erT00kWKmu5EMxTAypw',
    },
    introspection: true,
    schema,
    subscriptions: false,
    tracing: true,
    playground: true,
  });
  await connect(serverConfig.mongoDbUrl);
  const { url } = await server.listen({ port: process.env.PORT || serverConfig.port });
  console.log(`GQL 🚀 Gateway server ready at ${url}`);
})();
