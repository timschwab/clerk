<template>
	<div>
		<router-link :to="homeLink">Back to group</router-link>

		<div v-if="loaded">
			<h1>Yo</h1>
			<p>{{ budget }}</p>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
import useToast from "./stores/toast";
import budgetApi from "../api/budget";

export default {
	props: ["budget"],
	data() {
		return {
			toastStore: null,
			loaded: false,
			data: undefined
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchBudget();
	},
	computed: {
		homeLink() {
			return "/group/";
		}
	},
	methods: {
		async fetchBudget() {
			/*let groupData = await groupApi.getGroup(this.group);

			if (groupData.success) {
				this.data = groupData.return;
			} else {
				this.toastStore.error(groupData.message);
			}*/

			this.loaded = true;
		}
	}
};
</script>

<style></style>
