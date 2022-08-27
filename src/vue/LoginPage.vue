<template>
	<div>
		<h1>Log in yo</h1>
		<input v-model="user" type="text" placeholder="Username" />
		<input v-model="pass" type="password" placeholder="Password" />
		<button @click="login">Log in</button>
		<button @click="register">Register</button>
	</div>
</template>

<script>
import useAuth from './stores/auth';

export default {
	data() {
		return {
			user: '',
			pass: ''
		};
	},
	methods: {
		async login() {
			const authStore = useAuth();
			await authStore.login(this.user, this.pass);
		},
		async register() {
			const authStore = useAuth();
			await authStore.register(this.user, this.pass);
		}
	}
};
</script>

<style>
</style>
