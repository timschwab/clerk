<template>
	<div>
		<router-link :to="backLink" class="btn btn-primary">
			Back to budget
		</router-link>

		<div v-if="loaded">
			<h1>Monthly Expenses</h1>
			<p>
				<input
					v-model="forms.clump.name"
					type="text"
					placeholder="New clump name"
				/>
				<button @click="addClump" class="btn btn-primary">
					Add new expense clump
				</button>
			</p>

			<p>
				<select v-model="forms.expense.clump">
					<option disabled value="">Please select one</option>
					<option v-for="clump in clumpNames" :value="clump">
						{{ clump }}
					</option>
				</select>
				<input
					v-model="forms.expense.name"
					type="text"
					placeholder="New expense name"
				/>
				<input
					v-model="forms.expense.amount"
					type="number"
					placeholder="New expense amount"
				/>
				<button @click="addExpense" class="btn btn-primary">
					Add new expense
				</button>
			</p>

			<p>
				<input
					v-model="forms.spendingMoney.amount"
					type="number"
					placeholder="Monthly spending money"
				/>
				<button @click="setSpendingMoney" class="btn btn-primary">
					Set spending money
				</button>
			</p>

			<hr />

			<p>Revenue total: {{ revenueTotal.string }}</p>
			<p>Expenses total: {{ rearranged.totalString }}</p>
			<p>Spending money: {{ spendingMoneyString }}</p>
			<p>Padding: {{ padding }}</p>
			<ul>
				<li v-for="clump in rearranged.clumps" :key="clump.name">
					{{ clump.name }}: {{ clump.totalString }}
					<ul>
						<li v-for="expense in clump.expenses" :key="expense.name">
							{{ expense.name }}: {{ expense.amountString }}
						</li>
					</ul>
				</li>
			</ul>
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
				clump: {
					name: null
				},
				expense: {
					name: null,
					amount: null,
					clump: null
				},
				spendingMoney: {
					amount: null
				}
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
		clumpNames() {
			return Object.keys(this.data.expenses);
		},
		rearranged() {
			let clumpEntries = Object.entries(this.data.expenses);
			let clumpMapped = clumpEntries.map((entry) => {
				let expenseEntries = Object.entries(entry[1]);
				let expenseMapped = expenseEntries.map((entry) => {
					return {
						name: entry[0],
						amount: entry[1],
						amountString: utils.numToDollar(entry[1])
					};
				});

				let clumpTotal = expenseMapped.reduce(
					(acc, cur) => acc + cur.amount,
					0
				);

				return {
					name: entry[0],
					total: clumpTotal,
					totalString: utils.numToDollar(clumpTotal),
					expenses: expenseMapped
				};
			});

			let overallTotal = clumpMapped.reduce((acc, cur) => acc + cur.total, 0);

			return {
				total: overallTotal,
				totalString: utils.numToDollar(overallTotal),
				clumps: clumpMapped
			};
		},
		spendingMoneyString() {
			return utils.numToDollar(this.data.spendingMoney);
		},
		padding() {
			let val =
				this.revenueTotal.number -
				this.rearranged.total -
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
		},
		async addClump() {
			let name = this.forms.clump.name;

			if (!name) {
				this.toastStore.warning("Please choose a name for this expense clump");
				return;
			}

			if (this.data.expenses[name]) {
				this.toastStore.warning(
					"Please choose a unique name for this expense clump"
				);
				return;
			}

			this.data.expenses[name] = {};
			this.forms.clump.name = null;

			await this.save();
		},
		async addExpense() {
			let clump = this.forms.expense.clump;
			let name = this.forms.expense.name;
			let amount = Number(this.forms.expense.amount);

			if (!clump) {
				this.toastStore.warning("Please choose a clump for this expense");
				return;
			}

			if (!name) {
				this.toastStore.warning("Please choose a name for this expense");
				return;
			}

			if (this.data.expenses[clump][name]) {
				this.toastStore.warning(
					"This clump already has an expense with that name"
				);
				return;
			}

			if (!utils.validNumber(amount)) {
				this.toastStore.warning("Please choose valid amount for this expense");
				return;
			}

			this.data.expenses[clump][name] = amount;
			this.forms.expense.clump = "";
			this.forms.expense.name = null;
			this.forms.expense.amount = null;

			await this.save();
		},
		async setSpendingMoney() {
			let amount = this.forms.spendingMoney.amount;

			if (!utils.validNumber(amount)) {
				this.toastStore.warning(
					"Please choose valid amount for the spending money"
				);
				return;
			}

			this.data.spendingMoney = amount;

			await this.save();
		},
		async save() {
			//let budgetData = await budgetApi.saveExpenses(this.budget, this.data.expenses);
			let budgetData = { success: true };

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
