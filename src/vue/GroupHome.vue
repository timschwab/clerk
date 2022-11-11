<template>
	<div>
		<router-link to="/my-groups">Back to groups</router-link>

		<div v-if="loaded">
			<h1>{{ data.name }}</h1>

			<div class="card-deck row">
				<Card
					title="Budget"
					desc="Revenue, expenses, savings"
					linkName="Set"
					:linkDest="budgetLink"
				></Card>
			</div>

			<p>
				Your role: {{ data.role }}
				<span v-if="admin">
					| <router-link :to="settingsLink">Group settings</router-link>
				</span>
			</p>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
import useToast from "./stores/toast";
import groupApi from "../api/group";
import Card from "./Card.vue";

export default {
	components: {
		Card
	},
	props: ["group"],
	data() {
		return {
			loaded: false,
			data: undefined,
			toastStore: null
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
		settingsLink() {
			return "/group/" + this.group + "/settings";
		},
		budgetLink() {
			return "/group/" + this.group + "/budget";
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
		}
	}
};
</script>

<style></style>
