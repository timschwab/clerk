<template>
	<div>
		<router-link :to="backLink">Back to budget</router-link>

		<div v-if="loaded">
			<h1>Budget Revenue</h1>
			<div class="row">
				<div class="col-lg-6">
					<h2>Monthly Sources of Revenue</h2>
				</div>
				<div class="col-lg-6">
					<h2>Stats</h2>
					<ul>
						<li>Monthly: {{ totals.monthly }}</li>
						<li>Yearly: {{ totals.yearly }}</li>
						<li>Daily: {{ totals.daily }}</li>
						<li>Weekly: {{ totals.weekly }}</li>
					</ul>
				</div>
			</div>
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
		},
		totals() {
			let monthly = this.data.reduce((acc, cur) => acc + cur, 0);
			let yearly = monthly * 12;
			let daily = yearly / 365;
			let weekly = daily * 7;

			return {
				monthly: utils.numToDollar(monthly),
				yearly: utils.numToDollar(yearly),
				daily: utils.numToDollar(daily),
				weekly: utils.numToDollar(weekly)
			};
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
