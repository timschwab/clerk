<template>
	<div>
		<div v-if="loaded">
			<router-link :to="homeLink">Back to group</router-link>

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
			return "/group/" + this.data.group;
		}
	},
	methods: {
		async fetchBudget() {
			let budgetData = await budgetApi.info(this.budget);

			if (budgetData.success) {
				this.data = budgetData.return;
			} else {
				this.toastStore.error(budgetData.message);
			}

			this.loaded = true;
		}
	}
};
</script>

<style></style>
