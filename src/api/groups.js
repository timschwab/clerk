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

export default {
	myGroups,
};
