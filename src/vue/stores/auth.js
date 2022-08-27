import { defineStore } from 'pinia'

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
		this.token = "thinger";
		console.log("yay!");
		this.router.push({ name: "home" });
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