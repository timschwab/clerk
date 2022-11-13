<template>
	<div>
		<div v-if="loaded">
			<router-link :to="backLink">Back to group</router-link>

			<h1>Budget</h1>
			<p><router-link :to="revenueLink">Revenue</router-link></p>
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
		backLink() {
			return "/group/" + this.data.group;
		},
		revenueLink() {
			return "/budget/" + this.budget + "/revenue";
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
