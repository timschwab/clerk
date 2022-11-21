<template>
	<div v-if="authenticated">
		<router-link to="/" class="btn btn-primary">Home</router-link>
		<button @click="logout" class="btn btn-warning">Log out</button>
	</div>
</template>

<script>
import useAuth from "./stores/auth";

export default {
	computed: {
		authenticated() {
			const authStore = useAuth();
			return authStore.authenticated;
		}
	},
	methods: {
		logout() {
			const authStore = useAuth();
			authStore.logout();
		}
	}
};
</script>

<style scoped></style>
