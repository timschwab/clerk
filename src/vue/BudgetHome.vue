<template>
	<div>
		<div v-if="loaded">
			<router-link :to="backLink" class="btn btn-primary"
				>Back to group</router-link
			>

			<h1>Budget</h1>
			<p><router-link :to="revenueLink">Revenue</router-link></p>
			<p><router-link :to="expensesLink">Expenses</router-link></p>

			<p>Revenue: {{ revenueTotal.string }}</p>
			<p>Expenses: {{ expensesTotal.string }}</p>
			<p>Savings: Coming soon...</p>
			<p>Spending: {{ spendingMoneyString }}</p>
			<p>Padding: {{ padding }}</p>
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
			return "/group/" + this.data.group;
		},
		revenueLink() {
			return "/budget/" + this.budget + "/revenue";
		},
		expensesLink() {
			return "/budget/" + this.budget + "/expenses";
		},
		revenueTotal() {
			let val = Object.values(this.data.revenue).reduce(
				(acc, cur) => acc + cur,
				0
			);
			return {
				number: val,
				string: utils.numToDollar(val)
			};
		},
		expensesTotal() {
			let val = 0;
			console.log(this.data.expenses);
			for (let clump of Object.values(this.data.expenses)) {
				for (let expense of Object.values(clump)) {
					val += expense;
				}
			}

			return {
				number: val,
				string: utils.numToDollar(val)
			};
		},
		spendingMoneyString() {
			return utils.numToDollar(this.data.spendingMoney);
		},
		padding() {
			let val =
				this.revenueTotal.number -
				this.expensesTotal.number -
				this.data.spendingMoney;
			return utils.numToDollar(val);
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
