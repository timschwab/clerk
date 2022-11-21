<template>
	<div>
		<router-link :to="backLink" class="btn btn-primary">
			Back to budget
		</router-link>

		<div v-if="loaded">
			<h1>Monthly Expenses</h1>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
import useToast from "./stores/toast";
import budgetApi from "../api/budget";
import utils from "../utils";

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
			return "/budget/" + this.budget;
		}
	},
	methods: {
		async fetchBudget() {
			let budgetData = await budgetApi.info(this.budget);

			if (budgetData.success) {
				this.data = budgetData.return.revenue;
			} else {
				this.toastStore.error(budgetData.message);
			}

			this.loaded = true;
		}
	}
};
</script>

<style></style>
