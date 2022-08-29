import axios from 'axios';

const root = "https://api.clerk.finance";

async function login(name, pass) {
	try {
		let res = await axios.post(root + "/users/login", {
			name,
			pass
		});
		return {
			success: true,
			token: res.data.token
		};
	} catch (err) {
		return {
			success: false,
			err: err
		}
	}
}

async function register(name, pass) {
	try {
		let res = await axios.post(root + "/users/register", {
			name,
			pass
		});
		return res;
	} catch (err) {
		return err;
	}
}

async function validateToken(token) {
	try {
		await axios.post(root + "/tokens/validate", {
			token: token
		});
		return {
			success: true
		};
	} catch (err) {
		return {
			success: false,
			err: err
		};
	}
}

export default {
	login,
	register,
	validateToken
};
