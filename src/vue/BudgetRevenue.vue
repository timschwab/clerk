<template>
	<div>
		<router-link :to="backLink" class="btn btn-primary">
			Back to budget
		</router-link>

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
							type="number"
							placeholder="Revenue source amount"
						/>
						<button @click="add" class="btn btn-primary">
							Add new source of revenue
						</button>
					</p>

					<p v-for="source in rearranged" :key="source.name">
						{{ source.name }}: {{ source.amount }}
						<button @click="deleteSource(source)" class="btn btn-danger">
							Delete
						</button>
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
			let monthly = Object.values(this.data).reduce((acc, cur) => acc + cur, 0);
			let yearly = monthly * 12;
			let daily = yearly / 365;
			let weekly = daily * 7;

			return {
				monthly: utils.numToDollar(monthly),
				yearly: utils.numToDollar(yearly),
				daily: utils.numToDollar(daily),
				weekly: utils.numToDollar(weekly)
			};
		},
		rearranged() {
			let entries = Object.entries(this.data);
			let mapped = entries.map((entry) => {
				return {
					name: entry[0],
					amount: utils.numToDollar(entry[1])
				};
			});

			return mapped;
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
		async add() {
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

			if (!utils.validNumber(amount)) {
				this.toastStore.warning(
					"Please choose valid amount for this source of revenue"
				);
				return;
			}

			this.data[name] = amount;

			this.forms.name = null;
			this.forms.amount = null;

			await this.save();
		},
		async deleteSource(source) {
			delete this.data[source.name];
			await this.save();
		},
		async save() {
			let budgetData = await budgetApi.saveRevenue(this.budget, this.data);

			if (budgetData.success) {
				this.toastStore.info("Saved");
			} else {
				this.toastStore.error(budgetData.message);
			}
		}
	}
};
</script>

<style></style>
