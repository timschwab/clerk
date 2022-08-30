import axios from 'axios';
import { defineStore } from 'pinia';
import auth from '../../api/auth';
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
	async register(user, pass) {
		let res = await auth.register(user, pass);
		if (res.success) {
			await this.login(user, pass);
		} else {
			const toastStore = useToast();
			toastStore.error(res.message);
		}
	},
	async login(user, pass) {
		let res = await auth.login(user, pass);
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
			let res = await auth.validateToken(this.token);
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
