import data from "./../../data/data.json";

export = {
	Query: {
		getPerson(root: void, args: any) {
			const [found] = data.people.filter((p) => p._id === args._id);

			return found;
		},
	},
	Person: {
		__resolveType(obj: any) {
			return obj.age ? "Male" : "Female";
		},
	},
	Male: {
		countries(root: any) {
			const countries: any = [];
			root.countries.forEach((_id: any) =>
				countries.push(...data.countries.filter((c) => c._id === _id))
			);
			return countries;
		},
	},
	Country: {
		people(root: any) {
			const chars: any = [];
			root.people.forEach((_id: any) =>
				chars.push(...data.people.filter((c) => c._id === _id))
			);
			return chars;
		},
	},
};
