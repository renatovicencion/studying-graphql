import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import { loadSchemaSync } from "@graphql-tools/load";
import "graphql-import-node";
import resolvers from "./resolvers/resolversMap";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

// VERCEL NO SOPORTA  dynamic loaders COMO ESTE, ASÍ QUE DEBO CAMBIARLO
const typeDefs = loadSchemaSync("./schemas/**/*.graphql", {
	loaders: [new GraphQLFileLoader()],
});

export const schema: GraphQLSchema = mergeSchemas({
	schemas: [typeDefs],
	resolvers,
});
