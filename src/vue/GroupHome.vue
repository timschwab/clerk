<template>
	<div>
		<router-link to="/my-groups">Back to groups</router-link>
		<div v-if="loaded">
			<h1>{{ data.name }}</h1>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
import useToast from "./stores/toast";
import groupApi from "../api/groups";

export default {
	props: ["group"],
	data() {
		return {
			loaded: false,
			data: undefined,
			toastStore: null,
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchGroup();
	},
	methods: {
		async fetchGroup() {
			let groupData = await groupApi.getGroup(this.group);

			if (groupData.success) {
				this.data = groupData.return;
			} else {
				this.toastStore.error(groupData.message);
			}

			this.loaded = true;
		},
	},
};
</script>

<style></style>
