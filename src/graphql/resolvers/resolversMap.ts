import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolversFiles = loadFilesSync(__dirname);

const resolvers = mergeResolvers(resolversFiles);

export default resolvers;
