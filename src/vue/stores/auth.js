import { defineStore } from 'pinia'
import auth from '../../api/auth';

const state = () => {
	let storedToken = localStorage.getItem("token");

	return {
		token: storedToken
	};
}

const getters = {
	authenticated(state) {
		if (state.token) {
			return true;
		} else {
			return false;
		}
	}
};

const actions = {
	async register(user, pass) {
		let res = await auth.register(user, pass);
		console.log(res);
	},
	async login(user, pass) {
		let res = await auth.login(user, pass);
		if (res.success) {
			this.token = res.token;
			localStorage.setItem("token", res.token);

			this.router.push({
				name: 'home'
			});
		} else {
			console.log(res.err);
		}
	}
};

// Define store
const useStore = defineStore('main', {
	state,
	getters,
	actions
});

export default useStore;