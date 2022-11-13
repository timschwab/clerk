<template>
	<div>
		<router-link :to="backLink">Back to budget</router-link>

		<div v-if="loaded">
			<h1>Monthly Revenue</h1>
			<div class="row">
				<div class="col-lg-6">
					<h2>Sources of Revenue</h2>
					<p>
						<input
							v-model="forms.name"
							type="text"
							placeholder="Revenue source name"
						/>
						<input
							v-model="forms.amount"
							type="text"
							placeholder="Revenue source amount"
						/>
						<button @click="add">Add new source of revenue</button>
					</p>
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
			forms: {
				name: null,
				amount: null
			},
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
			let monthly = Object.values(this.data).reduce(
				(acc, cur) => acc + cur.amount,
				0
			);
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
		},
		add() {
			let name = this.forms.name;
			let amount = Number(this.forms.amount);

			if (!name) {
				this.toastStore.warning(
					"Please choose a name for this source of revenue"
				);
				return;
			}

			if (this.data[name]) {
				this.toastStore.warning(
					"Please choose a unique name for this source of revenue"
				);
				return;
			}

			if (
				Number.isNaN(amount) ||
				!amount ||
				amount == Infinity ||
				amount == -Infinity
			) {
				this.toastStore.warning(
					"Please choose valid amount for this source of revenue"
				);
				return;
			}

			this.data[name] = {
				name,
				amount
			};

			this.forms.name = null;
			this.forms.amount = null;
		}
	}
};
</script>

<style></style>
