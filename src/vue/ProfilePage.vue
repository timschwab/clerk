<template>
	<div>
		<h1>oh hi, it you</h1>
		<p>Your permanent ID: {{ info.id }}</p>
		<p>Your username: {{ info.username }}</p>
		<hr />
		<input v-model="newUsername" type="text" placeholder="New username" />
		<button @click="changeUsername">Change username</button>
		<br />
		<input v-model="newPassword" type="password" placeholder="New password" />
		<button @click="changePassword">Change password</button>
	</div>
</template>

<script>
import user from "../api/user";
import useToast from "./stores/toast";

export default {
	data() {
		return {
			info: {},
			newUsername: undefined,
			newPassword: undefined,
			toastStore: undefined,
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchInfo();
	},
	methods: {
		async fetchInfo() {
			let info = await user.info();
			if (info.success) {
				this.info = info.return;
			} else {
				this.toastStore.error(info.message);
			}
		},
		async changeUsername() {
			let result = await user.changeUsername(this.newUsername);
			if (result.success) {
				await this.fetchInfo();
				this.newUsername = undefined;
			} else {
				this.toastStore.error(result.message);
			}
		},
		async changePassword() {
			let result = await user.changePassword(this.newPassword);
			if (result.success) {
				this.toastStore.info("Password successfully changed");
				this.newPassword = undefined;
			} else {
				this.toastStore.error(result.message);
			}
		},
	},
};
</script>

<style></style>
