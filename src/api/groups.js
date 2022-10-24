import axios from "axios";
import result from "./result";

async function myGroups() {
	try {
		let groups = await axios.get("/groups/my");
		return result.success(groups.data.groups);
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Could not authenticate with the server.");
		} else {
			console.error(err);
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

async function create() {
	try {
		let groups = await axios.post("/groups/create");
		return result.success(groups.data.group);
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Could not authenticate with the server.");
		} else {
			console.error(err);
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

async function getGroup(group) {
	try {
		let groupData = await axios.get("/groups/" + group + "/info");
		return result.success(groupData.data.group);
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Could not authenticate with the server.");
		} else if (err.response && err.response.status == 403) {
			return result.failure(
				"You do not have access to this group, or it doesn't exist."
			);
		} else {
			console.error(err);
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

async function changeName(group, newName) {
	try {
		let endpoint = "/groups/" + group + "/name";
		let body = {
			newName
		};

		await axios.post(endpoint, body);
		return result.success();
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Could not authenticate with the server.");
		} else if (err.response && err.response.status == 403) {
			return result.failure(
				"You do not have access to this group, or it doesn't exist."
			);
		} else {
			console.error(err);
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

export default {
	myGroups,
	create,
	getGroup,
	changeName
};
