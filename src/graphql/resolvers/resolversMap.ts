import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import character from "./character";
import developer from "./developer";
import game from "./game";
import person from "./person";

// VERCEL NO SOPORTA  dynamic loaders COMO ESTE, ASÍ QUE DEBO CAMBIARLO
// const resolversFiles = loadFilesSync(__dirname);

const resolversFiles = [character, developer, game, person];

const resolvers = mergeResolvers(resolversFiles);

export default resolvers;
