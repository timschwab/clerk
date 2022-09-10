<template>
	<div>
		<h1>Henlo</h1>
		<input v-model="user" type="text" placeholder="Username" />
		<input v-model="pass" type="password" placeholder="Password" />
		<button @click="register">Register</button>
		<br />
		<router-link to="/login">Log in</router-link>
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
		register() {
			const authStore = useAuth();
			authStore.register(this.user, this.pass);
		}
	}
};
</script>

<style>
</style>
