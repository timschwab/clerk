import axios from 'axios';
import { defineStore } from 'pinia';
import user from '../../api/user';
import token from '../../api/token';
import useToast from './toast';

const state = () => {
	let storedToken = localStorage.getItem("token");
	if (storedToken) {
		axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
	}

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
	async register(username, password) {
		let res = await user.register(username, password);
		if (res.success) {
			await this.login(username, password);
		} else {
			const toastStore = useToast();
			toastStore.error(res.message);
		}
	},
	async login(username, password) {
		let res = await user.login(username, password);
		if (res.success) {
			this.token = res.return;
			localStorage.setItem("token", res.return);
			axios.defaults.headers.common["Authorization"] = "Bearer " + res.return;

			this.router.push({
				name: 'home'
			});
		} else {
			const toastStore = useToast();
			toastStore.error(res.message);
		}
	},
	async validateToken() {
		if (this.token) {
			let res = await token.validate(this.token);
			if (!res.success) {
				await this.logout();
				const toastStore = useToast();
				toastStore.error(res.message);
			}
		}
	},
	async logout() {
		this.token = null;
		localStorage.removeItem("token");
		axios.defaults.headers.common["Authorization"] = undefined;
		this.router.push({
			name: "login"
		});
	}
};

// Define store
const useStore = defineStore('auth', {
	state,
	getters,
	actions
});

export default useStore;
