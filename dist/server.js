"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const serverConfig_1 = require("./serverConfig");
const db_1 = require("./serverConfig/db");
const root_1 = require("./type/root");
const schema = apollo_server_1.makeExecutableSchema({
    resolvers: root_1.resolvers,
    typeDefs: root_1.typeDefs,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_1.ApolloServer({
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
    yield db_1.connect(serverConfig_1.serverConfig.mongoDbUrl);
    const { url } = yield server.listen({ port: process.env.PORT || serverConfig_1.serverConfig.port });
    console.log(`GQL 🚀 Gateway server ready at ${url}`);
}))();
//# sourceMappingURL=server.js.map