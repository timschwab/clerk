import axios from 'axios';
import result from "./result"

async function validate() {
	try {
		await axios.get("/tokens/validate");
		return result.success();
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Token seems to be expired.");
		} else {
			console.error(err);
			return result.failure("Something went wrong while communicating with the server.");
		}
	}
}

export default {
	validate
};
