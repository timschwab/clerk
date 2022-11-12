import axios from "axios";
import result from "./result";

async function fromGroup(group) {
	try {
		let budget = await axios.get("/budget/fromGroup/" + group);
		return result.success(budget.data.id);
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Could not authenticate with the server.");
		} else if (err.response && err.response.status == 403) {
			return result.failure(
				"You do not have authorization to do that, FRIEND."
			);
		} else if (err.response && err.response.status == 404) {
			return result.failure("That endpoint doesn't exist, my dude.");
		} else {
			console.error(err);
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

// Theoretically this should never have to be used
async function create(group) {
	try {
		let budget = await axios.post("/budget/create/" + group);
		return result.success(budget.data.id);
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Could not authenticate with the server.");
		} else if (err.response && err.response.status == 403) {
			return result.failure(
				"You do not have authorization to do that, FRIEND."
			);
		} else if (err.response && err.response.status == 404) {
			return result.failure("That endpoint doesn't exist, my dude.");
		} else {
			console.error(err);
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

async function info(budgetId) {
	try {
		let budget = await axios.get("/budget/" + budgetId);
		return result.success(budget.data.budget);
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Could not authenticate with the server.");
		} else if (err.response && err.response.status == 403) {
			return result.failure(
				"You do not have authorization to do that, FRIEND."
			);
		} else if (err.response && err.response.status == 404) {
			return result.failure("That endpoint doesn't exist, my dude.");
		} else {
			console.error(err);
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

export default {
	fromGroup,
	create,
	info
};
