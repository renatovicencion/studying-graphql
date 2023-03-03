import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import { loadSchemaSync } from "@graphql-tools/load";
import "graphql-import-node";
import resolvers from "./resolvers/resolversMap";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import character from "./schemas/character.graphql";
import developer from "./schemas/developer.graphql";
import game from "./schemas/game.graphql";
import person from "./schemas/person.graphql";

// VERCEL NO SOPORTA  dynamic loaders COMO ESTE, ASÍ QUE DEBO CAMBIARLO
// const typeDefs = loadSchemaSync("./**/*.graphql", {
// 	loaders: [new GraphQLFileLoader()],
// });

const typeDefs = [character, developer, game, person];

export const schema: GraphQLSchema = mergeSchemas({
	typeDefs: typeDefs,
	resolvers,
});
