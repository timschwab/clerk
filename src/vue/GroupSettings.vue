<template>
	<div>
		<router-link :to="homeLink">Back to group</router-link>

		<div v-if="loaded">
			<h1>{{ data.name }}</h1>
			<p>Your role: {{ data.role }}</p>
			<div v-if="admin">
				<p>
					<input v-model="newName" type="text" placeholder="New group name" />
					<button @click="changeName">Change group name</button>
				</p>
				<p>
					<button @click="deleteGroup">Delete group</button>
				</p>
			</div>
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
			newName: ""
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchGroup();
	},
	computed: {
		admin() {
			if (this.loaded) {
				return this.data.role == "admin";
			} else {
				return false;
			}
		},
		homeLink() {
			return "/group/" + this.group;
		}
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
		async changeName() {
			let result = await groupApi.changeName(this.group, this.newName);

			if (result.success) {
				this.data.name = this.newName;
				this.newName = "";
			} else {
				this.toastStore.error(result.message);
			}
		},
		async deleteGroup() {
			console.log("Deleting group");
		}
	}
};
</script>

<style></style>
