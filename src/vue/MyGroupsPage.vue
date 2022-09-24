<template>
	<div>
		<h1>It's your groups</h1>
		<p>You have {{ groups.length }} groups.</p>
		<button @click="createGroup">Create a new group</button>
	</div>
</template>

<script>
import groupApi from "../api/groups";
import useToast from "./stores/toast";

export default {
	data() {
		return {
			groups: [],
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchGroups();
	},
	methods: {
		async fetchGroups() {
			let groups = await groupApi.myGroups();
			if (groups.success) {
				this.groups = groups.return;
			} else {
				this.toastStore.error(groups.message);
			}
		},
		async createGroup() {
			let group = await groupApi.create();
			if (group.success) {
				await this.fetchGroups();
			} else {
				this.toastStore.error(group.message);
			}
		},
	},
};
</script>

<style></style>
