import axios from 'axios';

const root = "https://api.clerk.finance";

async function login(name, pass) {
	try {
		let res = await axios.post(root + "/users/login", {
			name,
			pass
		});
		return res;
	} catch (err) {
		return err;
	}
}

async function register(name, pass) {
	try {
		let res = await axios.post(root + "/users/create", {
			name,
			pass
		});
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	login,
	register
};
