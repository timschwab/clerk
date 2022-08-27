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
	async login(user, pass) {
		let res = await auth.login(user, pass);
		console.log(res);
	},
	async register(user, pass) {
		let res = await auth.register(user, pass);
		console.log(res);
	}
};

// Define store
const useStore = defineStore('main', {
	state,
	getters,
	actions
});

if (DEV_MODE) {
	// Expose globally for debugging
	window.store = useStore;
}

export default useStore;