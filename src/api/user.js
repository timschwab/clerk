import network from "./network";

async function login(name, pass) {
	return await network.post("/users/login", {
		name,
		pass
	});
}

async function register(name, pass) {
	return await network.post("/users/register", {
		name,
		pass
	});
}

async function info() {
	return await network.get("/users/info");
}

async function changeUsername(newUsername) {
	return await network.post("/users/changeUsername", {
		username: newUsername
	});
}

async function changePassword(newPassword) {
	return await network.post("/users/changePassword", {
		password: newPassword
	});
}

export default {
	login,
	register,
	info,
	changeUsername,
	changePassword
};
