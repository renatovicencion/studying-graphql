import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import depthLimit from "graphql-depth-limit";
import MongoLib from "./mongo";
import config from "./config";

const app = express();
app.use(cors());

let server;
const startServer = async () => {
	server = new ApolloServer({
		schema,
		introspection: true,
		context: async () => new MongoLib().connect(),
		validationRules: [depthLimit(2)],
	});
	await server.start();
	server.applyMiddleware({ app });
};

startServer();

app.listen(config.port, () => {
	console.log(`http://localhost:${config.port}/graphql`);
});
