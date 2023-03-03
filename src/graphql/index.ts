import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import { loadSchemaSync } from "@graphql-tools/load";
import "graphql-import-node";
import resolvers from "./resolvers/resolversMap";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const typeDefs = loadSchemaSync("./**/*.graphql", {
	loaders: [new GraphQLFileLoader()],
});

export const schema: GraphQLSchema = mergeSchemas({
	schemas: [typeDefs],
	resolvers,
});
