import { Db, ObjectId } from "mongodb";
import {
	CHARACTERS_COLLECTION,
	GAMES_COLLECTION,
} from "../../mongo/collections";
import { Character } from "../../interfaces/character";

export = {
	Query: {
		async getCharacters(root: void, args: void, context: Db) {
			try {
				return await context
					.collection(CHARACTERS_COLLECTION)
					.find()
					.toArray();
			} catch (error) {
				console.log(error);
			}
		},
		async getCharacter(root: void, args: any, context: Db) {
			const found = await context
				.collection(CHARACTERS_COLLECTION)
				.findOne({ _id: new ObjectId(args._id) });
			return found;
		},
	},
	Mutation: {
		async createCharacter(root: void, args: any, context: Db) {
			try {
				const regexp = new RegExp(args.character.name, "i");
				console.log(regexp);
				const exists = await context
					.collection(CHARACTERS_COLLECTION)
					.findOne({ name: regexp });

				if (exists) {
					throw new Error("Character already exists!");
				}

				await context
					.collection(CHARACTERS_COLLECTION)
					.insertOne(args.character);
				return "Character added successfully!";
			} catch (error: any) {
				console.log(error);
				return error.message;
			}
		},
		async editCharacter(
			root: void,
			{ _id, character }: { _id: string; character: Character },
			context: Db
		) {
			try {
				const exists = await context
					.collection(CHARACTERS_COLLECTION)
					.findOne({ _id: new ObjectId(_id) });

				if (exists) {
					await context
						.collection(CHARACTERS_COLLECTION)
						.updateOne(
							{ _id: new ObjectId(_id) },
							{ $set: character }
						);

					return "Character updated!";
				}

				throw new Error("Character does not exists!");
			} catch (error: any) {
				console.log(error);
				return error.message;
			}
		},
	},
	Character: {
		async games(root: Character, args: void, context: Db) {
			const gamesList = root.games.map(
				async (id: string) =>
					await context
						.collection(GAMES_COLLECTION)
						.findOne({ _id: new ObjectId(id) })
			);

			return gamesList;
		},
	},
};
