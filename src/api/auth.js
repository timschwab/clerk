import axios from 'axios';
import result from "./result"

const root = "https://api.clerk.finance";

async function login(name, pass) {
	try {
		let res = await axios.post(root + "/users/login", {
			name,
			pass
		});
		return result.success(res.data.token);
	} catch (err) {
		if (err.response && err.response.status == 401) {
			return result.failure("Incorrect username/password combination.");
		} else {
			console.error(err);
			return result.failure("Something went wrong while communicating with the server.");
		}
	}
}

async function register(name, pass) {
	try {
		await axios.post(root + "/users/register", {
			name,
			pass
		});
		return result.success();
	} catch (err) {
		if (err.response && err.response.status == 400) {
			return result.failure("That username is already taken.");
		} else {
			console.error(err);
			return result.failure("Something went wrong while communicating with the server.");
		}
	}
}

async function validateToken() {
	try {
		await axios.get(root + "/tokens/validate");
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
	login,
	register,
	validateToken
};
