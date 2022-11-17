import network from "./network";

async function myGroups() {
	return await network.get("/groups/my");
}

async function create() {
	return await network.post("/groups/create");
}

async function getGroup(group) {
	return await network.get("/groups/" + group + "/info");
}

async function changeName(group, newName) {
	let endpoint = "/groups/" + group + "/name";
	let body = {
		newName
	};

	return await network.post(endpoint, body);
}

async function deleteGroup(group) {
	return await network.delete("/groups/" + group);
}

export default {
	myGroups,
	create,
	getGroup,
	changeName,
	deleteGroup
};
