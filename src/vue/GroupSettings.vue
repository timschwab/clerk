<template>
	<div>
		<router-link :to="homeLink">Back to group</router-link>

		<div v-if="loaded">
			<h1>{{ data.name }}</h1>
			<p>Your role: {{ data.role }}</p>
			<div v-if="admin">
				<p>
					<input v-model="newName" type="text" placeholder="New group name" />
					<button @click="changeName" class="btn btn-primary">
						Change group name
					</button>
				</p>
				<p>
					<button @click="deleteGroup" class="btn btn-danger">
						Delete group
					</button>
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
import groupApi from "../api/group";

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
			if (!confirm("Are you sure? This is an unrecoverable action.")) {
				return;
			}

			let result = await groupApi.deleteGroup(this.group);

			if (result.success) {
				this.$router.push({
					name: "groups"
				});
			} else {
				this.toastStore.error(result.message);
			}
		}
	}
};
</script>

<style></style>
