import axios from "axios";
import result from "./result";

// This could be cleaned up if we want to
async function request(method, endpoint, body) {
	let config = {
		method,
		url: endpoint,
		data: body
	};

	try {
		let response = await axios(config);
		return result.success(response.data);
	} catch (err) {
		console.error(err);

		if (err.response) {
			let status = err.response.status;
			if (status == 400) {
				return result.failure("My bad, the request was malformed.");
			} else if (status == 401) {
				return result.failure("Could not authenticate with the server.");
			} else if (status == 403) {
				return result.failure(
					"You do not have authorization to do that, FRIEND."
				);
			} else if (status == 404) {
				return result.failure("That endpoint doesn't exist, my dude.");
			} else if (status == 500) {
				return result.failure("Server ain't happy.");
			} else {
				return result.failure(
					"Server sent back a strange and mysterious status code."
				);
			}
		} else {
			return result.failure(
				"Something went wrong while communicating with the server."
			);
		}
	}
}

async function get(endpoint) {
	return await request("get", endpoint);
}

async function post(endpoint, body) {
	return await request("post", endpoint, body);
}

async function deleteRequest(endpoint) {
	return await request("delete", endpoint);
}

export default {
	get,
	post,
	delete: deleteRequest
};
