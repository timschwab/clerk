import axios from "axios";
import result from "./result";

async function fromGroup(group) {
	try {
		let budget = await axios.get("/budget/fromGroup/" + group);
		return result.success(budget.budget);
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
	fromGroup
};
